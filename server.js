require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const Reservation = require('./models/Reservation');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Email Templates
const getWelcomeEmailHTML = (name, isNewUser) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background-color: #F9F5E3; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; }
    .header { background: linear-gradient(135deg, #591C1C 0%, #7a2424 100%); padding: 40px 20px; text-align: center; }
    .logo { color: #D4AF37; font-size: 32px; font-weight: bold; letter-spacing: 2px; margin: 0; }
    .subtitle { color: #F9F5E3; font-size: 12px; letter-spacing: 3px; margin-top: 5px; }
    .content { padding: 40px 30px; color: #2A2A2A; }
    .content h2 { color: #591C1C; font-size: 24px; margin-bottom: 20px; }
    .content p { line-height: 1.6; margin-bottom: 15px; }
    .highlight { background-color: #FFF8E7; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; }
    .footer { background-color: #2A2A2A; color: #E8E0D5; padding: 30px; text-align: center; font-size: 14px; }
    .footer a { color: #D4AF37; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">SHASTRA</h1>
      <p class="subtitle">VEG RESTAURANT</p>
    </div>
    <div class="content">
      <h2>${isNewUser ? 'Welcome to Shastra!' : 'Welcome Back!'}</h2>
      <p>Dear ${name},</p>
      <p>${isNewUser ?
        'Thank you for creating an account with Shastra Veg Restaurant. We are delighted to have you join our family of food enthusiasts!' :
        'It\'s wonderful to see you again! We\'re excited to serve you the finest South Indian vegetarian cuisine.'
    }</p>
      <div class="highlight">
        <strong>What makes Shastra special:</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Authentic South Indian flavors</li>
          <li>100% Pure Vegetarian Kitchen</li>
          <li>Vintage Royal Ambience</li>
          <li>Signature Benne Dosa & Biryanis</li>
          <li>Valet Parking Available</li>
        </ul>
      </div>
      <p>You can now make reservations seamlessly and enjoy exclusive updates about our special menu items and events.</p>
      <p>We look forward to serving you soon!</p>
      <p style="margin-top: 30px;">
        <strong>Warm regards,</strong><br>
        The Shastra Team<br>
        <span style="color: #666; font-size: 13px;">Mogappair West, Chennai</span>
      </p>
    </div>
    <div class="footer">
      <p>📍 Mogappair West / Nolambur, Chennai, Tamil Nadu</p>
      <p>📞 +91 98765 43210 | ⏰ Mon - Sun: 7:00 AM - 11:00 PM</p>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Shastra Veg Restaurant. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

const getReservationEmailHTML = (name, date, time, guests, specialRequest) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background-color: #F9F5E3; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; }
    .header { background: linear-gradient(135deg, #591C1C 0%, #7a2424 100%); padding: 40px 20px; text-align: center; }
    .logo { color: #D4AF37; font-size: 32px; font-weight: bold; letter-spacing: 2px; margin: 0; }
    .subtitle { color: #F9F5E3; font-size: 12px; letter-spacing: 3px; margin-top: 5px; }
    .content { padding: 40px 30px; color: #2A2A2A; }
    .content h2 { color: #591C1C; font-size: 24px; margin-bottom: 20px; }
    .content p { line-height: 1.6; margin-bottom: 15px; }
    .reservation-details { background-color: #FFF8E7; border: 2px solid #D4AF37; border-radius: 8px; padding: 25px; margin: 25px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E8E0D5; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { font-weight: 600; color: #591C1C; }
    .detail-value { color: #2A2A2A; }
    .checkmark { width: 60px; height: 60px; background-color: #4CAF50; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 36px; color: white; }
    .footer { background-color: #2A2A2A; color: #E8E0D5; padding: 30px; text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">SHASTRA</h1>
      <p class="subtitle">VEG RESTAURANT</p>
    </div>
    <div class="content">
      <div class="checkmark">✓</div>
      <h2 style="text-align: center;">Reservation Confirmed!</h2>
      <p>Dear ${name},</p>
      <p>Your table reservation at Shastra Veg Restaurant has been confirmed. We're excited to host you!</p>
      
      <div class="reservation-details">
        <div class="detail-row">
          <span class="detail-label">📅 Date:</span>
          <span class="detail-value">${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">🕐 Time:</span>
          <span class="detail-value">${time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">👥 Guests:</span>
          <span class="detail-value">${guests} ${guests === '1' ? 'Person' : 'People'}</span>
        </div>
        ${specialRequest ? `
        <div class="detail-row">
          <span class="detail-label">📝 Special Request:</span>
          <span class="detail-value">${specialRequest}</span>
        </div>
        ` : ''}
      </div>

      <p><strong>Important Information:</strong></p>
      <ul style="line-height: 1.8; color: #555;">
        <li>Please arrive 10 minutes before your reservation time</li>
        <li>Valet parking is available for 4-wheelers</li>
        <li>For any changes, please call us at +91 98765 43210</li>
        <li>We hold reservations for 15 minutes past the booking time</li>
      </ul>

      <p style="margin-top: 30px;">We look forward to serving you an unforgettable dining experience!</p>
      
      <p style="margin-top: 30px;">
        <strong>Warm regards,</strong><br>
        The Shastra Team<br>
        <span style="color: #666; font-size: 13px;">Mogappair West, Chennai</span>
      </p>
    </div>
    <div class="footer">
      <p>📍 Mogappair West / Nolambur, Chennai, Tamil Nadu</p>
      <p>📞 +91 98765 43210 | ⏰ Mon - Sun: 7:00 AM - 11:00 PM</p>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Shastra Veg Restaurant. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;

// API Routes

// Signup - Create new user and send welcome email
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered. Please login instead.' });
        }

        // Create new user
        const user = new User({ name, email, phone });
        await user.save();

        // Send welcome email
        const mailOptions = {
            from: `"Shastra Veg Restaurant" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: '🎉 Welcome to Shastra Veg Restaurant!',
            html: getWelcomeEmailHTML(name, true)
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: 'Account created successfully!',
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Failed to create account. Please try again.' });
    }
});

// Login - Authenticate user and send welcome back email
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, phone } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Account not found. Please sign up first.' });
        }

        // Verify phone number matches
        if (user.phone !== phone) {
            return res.status(401).json({ error: 'Invalid credentials. Please check your phone number.' });
        }

        // Send welcome back email
        const mailOptions = {
            from: `"Shastra Veg Restaurant" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: '👋 Welcome Back to Shastra!',
            html: getWelcomeEmailHTML(user.name, false)
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: 'Login successful!',
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to login. Please try again.' });
    }
});

// Create Reservation - Save to DB and send confirmation email
app.post('/api/reservations', async (req, res) => {
    try {
        const { email, name, phone, date, time, guests, specialRequest } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found. Please login first.' });
        }

        // Create reservation
        const reservation = new Reservation({
            userId: user._id,
            name,
            email,
            phone,
            date,
            time,
            guests,
            specialRequest: specialRequest || ''
        });

        await reservation.save();

        // Send confirmation email
        const mailOptions = {
            from: `"Shastra Veg Restaurant" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: '✅ Table Reservation Confirmed - Shastra Veg Restaurant',
            html: getReservationEmailHTML(name, date, time, guests, specialRequest)
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: 'Reservation confirmed!',
            reservation: {
                id: reservation._id,
                date: reservation.date,
                time: reservation.time,
                guests: reservation.guests
            }
        });
    } catch (error) {
        console.error('Reservation error:', error);
        res.status(500).json({ error: 'Failed to create reservation. Please try again.' });
    }
});

// Get user's reservations
app.get('/api/reservations/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const reservations = await Reservation.find({ email })
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({ reservations });
    } catch (error) {
        console.error('Get reservations error:', error);
        res.status(500).json({ error: 'Failed to fetch reservations.' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Shastra Backend Server is running',
        mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Shastra Backend Server running on http://localhost:${PORT}`);
    console.log(`📧 Email service: ${process.env.GMAIL_USER ? 'Configured' : 'Not configured'}`);
    console.log(`🗄️  Database: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
});

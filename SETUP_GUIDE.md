# Shastra Restaurant - Setup Guide

This guide will help you set up the backend server with Gmail email integration and MongoDB database.

## Prerequisites

- Node.js installed (v16 or higher)
- A Gmail account
- MongoDB (either cloud-based MongoDB Atlas or local installation)

---

## Step 1: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- `express` - Backend server
- `nodemailer` - Email sending
- `mongoose` - MongoDB database
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables

---

## Step 2: Set Up Gmail App Password

Gmail requires an "App Password" for third-party applications to send emails.

### Instructions:

1. **Enable 2-Factor Authentication** (if not already enabled):
   - Go to your Google Account: https://myaccount.google.com/
   - Click on "Security" in the left sidebar
   - Under "How you sign in to Google", click on "2-Step Verification"
   - Follow the prompts to enable it

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - You may need to sign in again
   - In the "Select app" dropdown, choose "Mail"
   - In the "Select device" dropdown, choose "Other (Custom name)"
   - Enter "Shastra Restaurant" as the custom name
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `xxxx xxxx xxxx xxxx`)
   - Save this password - you'll need it in Step 4

---

## Step 3: Set Up MongoDB

You have two options: **MongoDB Atlas (Cloud)** or **Local MongoDB**.

### Option A: MongoDB Atlas (Recommended - Free & Easy)

1. **Create Account**:
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a Cluster**:
   - After logging in, click "Build a Database"
   - Select the **FREE** tier (M0 Sandbox)
   - Choose a cloud provider and region (preferably closest to you)
   - Click "Create Cluster" (this may take 1-3 minutes)

3. **Create Database User**:
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username (e.g., `shastra-admin`)
   - Click "Autogenerate Secure Password" and **copy the password**
   - Under "Database User Privileges", select "Read and write to any database"
   - Click "Add User"

4. **Allow Network Access**:
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**:
   - Click "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string (it looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Replace `<username>` with your database username**
   - **Replace `<password>` with your database user password**
   - Add `/shastra-restaurant` before the `?` to specify the database name:
     ```
     mongodb+srv://shastra-admin:yourpassword@cluster0.xxxxx.mongodb.net/shastra-restaurant?retryWrites=true&w=majority
     ```

### Option B: Local MongoDB

1. **Download and Install**:
   - Windows: https://www.mongodb.com/try/download/community
   - Download the MSI installer and run it
   - Choose "Complete" installation
   - Install MongoDB as a Service

2. **Verify Installation**:
   ```bash
   mongod --version
   ```

3. **Connection String**:
   - Use: `mongodb://localhost:27017/shastra-restaurant`

---

## Step 4: Configure Environment Variables

1. Open the `.env` file in the project root directory

2. Replace the placeholder values with your actual credentials:

```env
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# MongoDB Configuration
# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shastra-restaurant?retryWrites=true&w=majority

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/shastra-restaurant

# Server Configuration
PORT=3001
```

### Example (with fake credentials):
```env
GMAIL_USER=shastra.restaurant@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

MONGODB_URI=mongodb+srv://shastra-admin:MySecurePass123@cluster0.abc123.mongodb.net/shastra-restaurant?retryWrites=true&w=majority

PORT=3001
```

---

## Step 5: Run the Application

You need to run **two servers** simultaneously:

### Terminal 1 - Backend Server:
```bash
npm run server
```

You should see:
```
✅ Connected to MongoDB
🚀 Shastra Backend Server running on http://localhost:3001
📧 Email service: Configured
🗄️  Database: Configured
```

### Terminal 2 - Frontend Development Server:
```bash
npm run dev
```

You should see:
```
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

---

## Step 6: Test the Integration

1. **Open the website**: http://localhost:5173/

2. **Test Signup**:
   - Click "Reserve a Table"
   - Click "Sign Up" tab
   - Enter your name, email, and phone
   - Click "Create Account"
   - ✅ Check your email inbox for welcome email

3. **Test Login**:
   - Close the modal and click "Reserve a Table" again
   - Click "Login" tab
   - Enter the same email and phone
   - Click "Login to Continue"
   - ✅ Check your email for welcome back email

4. **Test Reservation**:
   - After logging in, fill in the reservation form
   - Select date, time, number of guests
   - Add a special request (optional)
   - Click "Confirm Reservation"
   - ✅ Check your email for reservation confirmation

5. **Verify Database**:
   - For MongoDB Atlas: Go to your cluster → Browse Collections
   - You should see:
     - `users` collection with your account
     - `reservations` collection with your booking

---

## Troubleshooting

### Email not sending:
- ✅ Verify Gmail App Password is correct (16 characters, no spaces)
- ✅ Check that 2-Factor Authentication is enabled on your Google account
- ✅ Make sure `GMAIL_USER` is your full email address
- ✅ Check backend terminal for error messages

### Database connection error:
- ✅ Verify MongoDB connection string is correct
- ✅ For Atlas: Check that your IP is whitelisted in Network Access
- ✅ For Atlas: Verify database username and password are correct
- ✅ For Local: Make sure MongoDB service is running

### Backend server won't start:
- ✅ Make sure port 3001 is not already in use
- ✅ Run `npm install` again to ensure all dependencies are installed
- ✅ Check that `.env` file exists and has all required variables

### CORS errors in browser:
- ✅ Make sure backend server is running on port 3001
- ✅ Make sure frontend is running on port 5173
- ✅ Check browser console for specific error messages

---

## Security Notes

⚠️ **Important**:
- Never commit the `.env` file to Git (it's already in `.gitignore`)
- Never share your Gmail App Password or MongoDB credentials
- For production deployment, use environment variables provided by your hosting service
- Consider using a dedicated email service like SendGrid or AWS SES for production

---

## Next Steps

Once everything is working:
1. Customize email templates in `server.js`
2. Add more fields to User or Reservation models if needed
3. Implement user authentication with passwords (optional)
4. Add admin dashboard to view all reservations
5. Deploy to production (Vercel, Heroku, Railway, etc.)

---

## Support

If you encounter any issues:
1. Check the terminal logs for both frontend and backend
2. Verify all environment variables are set correctly
3. Make sure both servers are running simultaneously
4. Check the browser console for any error messages

Happy coding! 🚀

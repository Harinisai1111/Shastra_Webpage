const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Reservation date is required']
    },
    time: {
        type: String,
        required: [true, 'Reservation time is required']
    },
    guests: {
        type: String,
        required: [true, 'Number of guests is required']
    },
    specialRequest: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster lookups
reservationSchema.index({ email: 1, date: 1 });
reservationSchema.index({ userId: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);

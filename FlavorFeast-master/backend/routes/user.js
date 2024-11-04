const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const mailer = require('../utils/mailer.js');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'SHY23FDA45G2G1K89KH5sec4H8KUTF85ret';

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

router.post('/register', async (req, res) => {
    try {
        const { email, password, confirm_password } = req.body;

        if (password !== confirm_password) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists, choose another' });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hash,
            admin: 0
        });
        await newUser.save();

        await mailer(email, 'reg', 'Welcome to Raattai and happy purchasing. Please confirm your registration by logging into http://3.6.184.48:3000/login');
       
        res.json({ success: 'You will receive an email notification.' });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token ,message:'logged successfully'});

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/logout', async (req, res) => {
    try {
        // Handle logout logic here if needed
        res.json({ message: 'You are logged out!' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const OTP = generateOTP();
        await mailer(email, 'Password Reset OTP', `Your OTP for password reset is: ${OTP}`, `Your OTP for password reset is: <b>${OTP}</b>`);
        
        const token = jwt.sign({ email, OTP }, JWT_SECRET, { expiresIn: '15m' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { token, OTP, newPassword } = req.body;

        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.OTP !== parseInt(OTP)) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        user.password = hash;
        await user.save();
        // No need to handle logout or session destruction since Passport is removed
        res.json({ message: 'Password reset successfully. Please log in again.' });
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid or expired token' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
module.exports = router;

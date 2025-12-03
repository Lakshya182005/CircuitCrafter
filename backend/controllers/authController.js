const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET || 'default_secret_key_change_me',
        { expiresIn: '7d' }
    );
};

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        // Check if user exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate token
        const token = generateToken(user);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        if (!user.password) {
            return res.status(400).json({ message: 'Invalid credentials. Try Google login.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.googleAuth = async (req, res) => {
    try {
        const { credential } = req.body;


        let payload;
        try {
            // Verify access token and get user info
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${credential}` }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }

            payload = await response.json();
        } catch (err) {
            console.log("Access token verification failed, trying as placeholder...");
             try {
                const parts = credential.split('.');
                if (parts.length === 3) {
                    payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
                } else {
                    return res.status(400).json({ message: 'Invalid token' });
                }
            } catch (innerErr) {
                 return res.status(400).json({ message: 'Invalid token' });
            }
        }

        const { email, name, sub, picture } = payload;

        let user = await User.findOne({ email });

        if (user) {

            if (!user.googleId) {
                user.googleId = sub;
                await user.save();
            }
        } else {

            let username = name.replace(/\s+/g, '').toLowerCase();
            let usernameExists = await User.findOne({ username });
            if (usernameExists) {
                username = `${username}${Math.floor(Math.random() * 1000)}`;
            }

            user = new User({
                username,
                email,
                googleId: sub,
                avatar: picture
            });
            await user.save();
        }

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('Google Auth error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error('GetMe error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const User = require('../models/User');

// @desc    Sync user from Clerk to MongoDB
// @route   POST /api/user/sync
// @access  Private
const syncUser = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { email, name } = req.body;

        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            user = new User({
                clerkId: userId,
                email,
                name,
            });
            await user.save();
        } else {
            // Update user info if needed
            user.email = email || user.email;
            user.name = name || user.name;
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get current user
// @route   GET /api/user/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const { userId } = req.auth;
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    syncUser,
    getMe,
};

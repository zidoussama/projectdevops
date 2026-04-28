const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { firstname, lastname, email, password ,role} = req.body;

        // Check all fields
        if (!firstname || !lastname || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            firstname,
            lastname,
            role,
            email,
            password: hashedPassword,
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Generate JWT
        const token = jwt.sign(
            { id: savedUser._id ,username: savedUser.firstname + ' ' + savedUser.lastname},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with success
        res.status(201).json({
            status: 'ok',
            msg: 'Successfully registered',
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id ,username: user.firstname + ' ' + user.lastname,role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with user info and token
        res.status(200).json({
            status: 'ok',
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
// Corrected auth controller logic

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { inngest } from '../inngest/client.js';

export const signup = async (req, res) => {
    const { email, password, skills = [] } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword, skills });

        await inngest.send({
            name: "user/signup",
            data: { email }
        });

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        // IMPROVEMENT: Avoid sending the password back to the client
        const userResponse = {
            _id: user._id,
            email: user.email,
            role: user.role,
            skills: user.skills,
            createdAt: user.createdAt
        };

        res.json({ user: userResponse, token });

    } catch (error) {
        res.status(500).json({ error: "Signup Failed", details: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // FIX: Added 'await' to User.findOne to get the user document.
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // FIX: Added 'await' to bcrypt.compare, as it's an async operation.
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // FIX: Changed jwt.login to the correct method, jwt.sign.
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        res.json({ user, token });

    } catch (error) {
        // FIX: Corrected error response syntax.
        res.status(500).json({ error: "Login Failed", details: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Added optional chaining for safety
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" });
            }
        });

        // Note: For stateless JWT, "logout" on the server is typically just verifying the token is valid.
        // The actual logout happens on the client by deleting the token.
        res.json({ message: "Logout successfully" });

    } catch (error) {
        res.status(500).json({ error: "Logout Failed", details: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { skills = [], role, email } = req.body;
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" }); // Use 404 for not found
        }

        await User.updateOne(
            { email },
            { skills: skills.length ? skills : user.skills, role }
        );

        return res.json({ message: "User updated successfully" });

    } catch (error) {
        res.status(500).json({ error: "User update failed", details: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const users = await User.find().select("-password");
        return res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Can't get users", details: error.message });
    }
};
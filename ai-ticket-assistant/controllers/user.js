import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import { inngest } from '../inngest/client.js';

// const token = jwt.sign(
//   { userId: user._id },    // payload
//   'mysecretkey',           // secret key
//   { expiresIn: '1h' }      // options
// );

export const signup = async (req, res) => {
    const { email, password, skills = [] } = req.body;
    try {
        const hashedPassword = bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, skills })
        //fire inngest
        await inngest.send({
            name: "user/signup",//name of the event on which data is send
            data: {
                email,
            }
        });

        const token = jwt.sign(
            { _id: user._id, role: user.role }, // Payload,the data on which the token is created 
            process.env.JWT_SECRET              // Secret key,hashing value of the token
        );

        res.json({ user, token });//as it is for personal project i am passing user but in production u must not pass this

    } catch (error) {
        res.send(500).json({ error: "Signup Failed", details: error.message });//send the status as well as json error
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = User.findOne({ email });

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send(401).json({ error: "Invalid Credentials" });
        }

        const token = jwt.login(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        res.json({ user, token });

    } catch (error) {
        res.send(500).json({ error: "Login Failed", details: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1] //in the request i am accessing the headers authorization the format is like this[bearer tokenValue] so i split the space and only took the token value
        if (!token) {
            return res.status(401).json({ error: "Unothorized" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) { return res.status(401).json({ error: "Unauthorized" }); }
        })
        res.json({ message: "Logout sucessfully" });
    } catch (error) {
        res.status(500).json({ error: "Logout Failed", details: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { skills = [], role, email } = req.body;
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }
        const user = await User.findOne({ email });
        if (!user) { res.status(401).json({ error: "User not found" }); }

        await User.updateOne(
            { email },
            { skills: skills.lenght ? skills : user.skills, role }
        )
        return res.json({ message: "User updated sucessfully" });
    } catch (error) {
        res.send(500).json({ error: "User Failed", details: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }

        const users = await User.find().select("-password");
        return res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Can't get users", details: error.message });
    }
}






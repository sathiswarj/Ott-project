const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../model/authModel");
const dotenv = require("dotenv")
dotenv.config();

 const signup = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new authModel({ userName, email, password: hashPassword });
        await user.save();

        return res.status(200).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await authModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User not registered" });
        }

        const hashedPassword = await bcrypt.compare(password, existingUser.password);
        
        if (!hashedPassword) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: existingUser._id },  
            process.env.JWT_SECRET, 
            { expiresIn: "30d" }
        );

        return res.status(200).json({ success: true, token });
        
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { signup, login };

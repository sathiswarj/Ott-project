const express = require("express")
const jwt = require("jsonwebtoken")  
const dotenv = require("dotenv")
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];  
        
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const token = authHeader.split(' ')[1]; 
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();

    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware
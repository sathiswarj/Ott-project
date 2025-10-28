const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./router/authRoutes");
const movieRoutes = require("./router/movieRoutes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

 app.use(cors({
    origin: ['https://ott-project.onrender.com', 'http://localhost:3000'], // Add frontend URLs
    credentials: true
}));

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/movies", movieRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

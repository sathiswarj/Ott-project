const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./router/authRoutes")
const movieRoutes = require("./router/movieRoutes")
const app = express();
 const dotenv = require("dotenv")
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes)
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


app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

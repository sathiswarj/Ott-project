const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Movie", "TV Show"], 
  },
  budget: {
    type: Number,
    min: 0,
  },
  location: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,  
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: [
      "Action",
      "Comedy",
      "Drama",
      "Horror",
      "Romance",
      "Sci-Fi",
      "Thriller",
      "Animation",
      "Documentary",
      "Other"
    ],
  },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true,
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;

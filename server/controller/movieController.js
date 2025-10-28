const Movie = require("../model/movieModel");

const createMovie = async (req, res) => {
  try {
    const movie = new Movie({
      ...req.body,
      userId: req.user.id  
    });
    await movie.save();
    res.status(201).json({ success: true, message: "Movie created successfully", movie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create movie", error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    console.log("User from token:", req.user); // Check what user data we have
    console.log("User ID:", req.user.id); // Check the specific ID
    
    const movies = await Movie.find({ userId: req.user.id });
    console.log("Movies found:", movies.length); // Check how many movies found
    
    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ success: false, message: "Failed to fetch movies", error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
     const movie = await Movie.findOne({ _id: req.params.id, userId: req.user.id });
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });
    res.status(200).json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch movie", error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
     const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });
    res.status(200).json({ success: true, message: "Movie updated successfully", movie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update movie", error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
     const movie = await Movie.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });
    res.status(200).json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete movie", error: error.message });
  }
};

module.exports = { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie };
const express = require("express");
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controller/movieController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createMovie);
router.get("/", authMiddleware, getAllMovies);
router.get("/:id", authMiddleware, getMovieById);
router.put("/:id", authMiddleware, updateMovie);
router.delete("/:id", authMiddleware, deleteMovie);

module.exports = router;

import React, { useEffect, useState } from "react";
import { ApiGetRequset } from "../data/ApiGetRequest";
import { ApiPostRequest } from "../data/ApiPostRequest";
import EditMoviePopup from "./Popup";
import { useNavigate } from "react-router-dom";
import { Pen, Trash } from 'lucide-react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Grid,
  InputAdornment
} from "@mui/material";
import {
  Add as AddIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  FilterAltOff as FilterAltOffIcon
} from "@mui/icons-material";

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await ApiGetRequset.getAllMovies();
      if (response.success === true) {
        setData(response.movies);
        setFilteredData(response.movies);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.director.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterType) filtered = filtered.filter((m) => m.type === filterType);
    if (filterGenre) filtered = filtered.filter((m) => m.genre === filterGenre);
    if (filterYear) filtered = filtered.filter((m) => String(m.year) === filterYear);

    setFilteredData(filtered);
  }, [search, filterType, filterGenre, filterYear, data]);

  const handleEdit = (id) => {
    const movieToEdit = data.find((movie) => movie._id === id);
    if (movieToEdit) {
      setSelectedMovie(movieToEdit);
      setIsEdit(true);
      setShowPopup(true);
    }
  };

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!selectedMovie) return;
    try {
      const response = await ApiPostRequest.deleteMovie(selectedMovie._id);
      if (response.success) {
        alert("Movie deleted successfully!");
        setDeletePopup(false);
        setSelectedMovie(null);
        fetchMovies();
      } else {
        alert(response.message || "Failed to delete movie");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("An error occurred while deleting the movie");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    navigate("/");
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedMovie(null);
    setIsEdit(false);
  };

  const resetFilters = () => {
    setSearch("");
    setFilterType("");
    setFilterGenre("");
    setFilterYear("");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4,  width:"100%"}}>
      <Container maxWidth="xl" width="100%">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: "#1976d2" }}>
              Movie Management
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedMovie(null);
                  setIsEdit(false);
                  setShowPopup(true);
                }}
                sx={{
                  bgcolor: "#1976d2",
                  "&:hover": { bgcolor: "#1565c0" },
                  textTransform: "none",
                  px: 3
                }}
              >
                Add New Movie
              </Button>
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  borderColor: "#757575",
                  color: "#757575",
                  "&:hover": { borderColor: "#616161", bgcolor: "#f5f5f5" },
                  textTransform: "none",
                  px: 3
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

           <Paper elevation={0} sx={{ bgcolor: "#fafafa", p: 3, mb: 4, borderRadius: 2, width:"100%"}}>
            <Box sx={{ display: "flex", gap: 2, width: "100%", flexWrap: "wrap" }}>
              <Box sx={{ flex: 1, minWidth: "200px" }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search by title or director..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ flex: 1, minWidth: "150px" }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    label="Type"
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Movie">Movie</MenuItem>
                    <MenuItem value="TV Show">TV Show</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: 1, minWidth: "150px" }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Genre</InputLabel>
                  <Select
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    label="Genre"
                  >
                    <MenuItem value="">All Genres</MenuItem>
                    <MenuItem value="Action">Action</MenuItem>
                    <MenuItem value="Comedy">Comedy</MenuItem>
                    <MenuItem value="Drama">Drama</MenuItem>
                    <MenuItem value="Horror">Horror</MenuItem>
                    <MenuItem value="Romance">Romance</MenuItem>
                    <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                    <MenuItem value="Thriller">Thriller</MenuItem>
                    <MenuItem value="Animation">Animation</MenuItem>
                    <MenuItem value="Documentary">Documentary</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>

            

              <Box sx={{ minWidth: "150px" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterAltOffIcon />}
                  onClick={resetFilters}
                  sx={{
                    height: "40px",
                    textTransform: "none",
                    borderColor: "#9e9e9e",
                    color: "#616161",
                    "&:hover": { borderColor: "#757575", bgcolor: "#f5f5f5" }
                  }}
                >
                  Reset Filters
                </Button>
              </Box>
            </Box>
          </Paper>

          {showPopup && (
            <EditMoviePopup
              onClose={handleClosePopup}
              movieData={selectedMovie}
              isEdit={isEdit}
            />
          )}

          <Dialog open={deletePopup} onClose={() => setDeletePopup(false)} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 600 }}>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete <strong>{selectedMovie?.title}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setDeletePopup(false)} sx={{ textTransform: "none" }}>
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                variant="contained"
                color="error"
                sx={{ textTransform: "none" }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <TableContainer>
            <MuiTable>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 600 }}>No</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Director</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Budget</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Year</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Genre</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((movie, index) => (
                    <TableRow key={movie._id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{movie.title}</TableCell>
                      <TableCell>{movie.type}</TableCell>
                      <TableCell>{movie.director}</TableCell>
                      <TableCell>{movie.budget}</TableCell>
                      <TableCell>{movie.location}</TableCell>
                      <TableCell>{movie.duration}</TableCell>
                      <TableCell>{movie.year}</TableCell>
                      <TableCell>{movie.genre}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(movie._id)}
                            sx={{ color: "#1976d2" }}
                          >
                            <Pen size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(movie)}
                            sx={{ color: "#d32f2f" }}
                          >
                            <Trash size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ py: 4, color: "#757575" }}>
                      No movies match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Table;
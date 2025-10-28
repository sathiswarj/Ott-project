import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ApiPostRequest } from "../../data/ApiPostRequest";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Link as MuiLink
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon
} from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await ApiPostRequest.login({email, password})
      
      if(response.success && response.token){
        localStorage.setItem("usertoken", response.token)
        alert("Logged in successfully")
        setTimeout(() =>{
          navigate("/home")
        },2000)
      } else {
        setError("Login failed. Please check your credentials.")
        alert("Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.log(`Error:`, error)
      setError("An error occurred during login")
      alert("An error occurred during login")
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "900px" }}>
        <Paper
          elevation={24}
          sx={{
            padding: { xs: 3, sm: 8 },
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)"
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1
              }}
            >
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                  },
                  "&:disabled": {
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    opacity: 0.7,
                  },
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <MuiLink
                    component={Link}
                    to="/signup"
                    sx={{
                      color: "#667eea",
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign Up
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
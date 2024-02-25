import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit");
  };
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid
      style={{ height: "100vh" }}
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom pb={2}>
            Registration Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="FirstName"
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  value={input?.firstName}
                  onChange={updateField}
                  // Add your other TextField props as needed
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="lastName"
                  label="LastName"
                  variant="outlined"
                  fullWidth
                  value={input?.lastName}
                  onChange={updateField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={input?.email}
                  onChange={updateField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={input?.password}
                  onChange={updateField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  value={input?.confirmPassword}
                  onChange={updateField}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Box pt={2} textAlign="center">
          <Typography component="p">
            Already have an account?{" "}
            <Link to="/login">
              <Typography component="span" color="#F0C029">
                Login
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;

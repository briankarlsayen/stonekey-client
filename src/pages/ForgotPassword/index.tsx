import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <Box height="100vh">
      <Grid container height="100%">
        <Grid sm={0} md={6} lg={8} bgcolor="green"></Grid>
        <Grid sm={12} md={6} lg={4} p={2} width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyItems="center"
            height="100%"
            width="100%"
          >
            <ForgotPasswordForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const ForgotPasswordForm = () => {
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
    <Box width="100%">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom pb={2}>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
    </Box>
  );
};

export default ForgotPassword;

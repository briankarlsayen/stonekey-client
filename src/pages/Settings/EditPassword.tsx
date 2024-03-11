import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";

function EditPassword() {
  const [input, setInput] = useState({
    oldPassword: "",
    password: "",
  });
  const [isError, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("input", input);
    if (input.password !== "password") setError(true);
  };

  const updateField = (e) => {
    setError(false);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PasswordInput
            name="oldPassword"
            value={input.oldPassword}
            fullWidth
            label="Old Password"
            onChange={updateField}
            error={isError}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordInput
            fullWidth
            name="password"
            label="Password"
            value={input.password}
            onChange={updateField}
            error={isError}
          />
        </Grid>
      </Grid>
      {isError && (
        <Typography pt={2} color="error">
          Invalid input
        </Typography>
      )}
      <Box display="flex" flexDirection="row-reverse" pt={2} gap={2}>
        <Button type="submit" variant="contained" color="primary">
          Change
        </Button>
      </Box>
    </form>
  );
}

export default EditPassword;

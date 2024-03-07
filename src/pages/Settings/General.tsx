import { Delete, Upload } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";

import profileImage from "../../assets/dog-img.jpg";

function General() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = () => {};

  const updateField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <img
                src={profileImage}
                alt="profile image"
                height={200}
                width={200}
                style={{ objectFit: "cover", borderRadius: 100 }}
              />
              <Box display="flex" gap={1}>
                <IconButton>
                  <Upload />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={input?.firstName}
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="lastName"
            label="Last Name"
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
      </Grid>
      <Box display="flex" flexDirection="row-reverse" pt={2} gap={2}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </form>
  );
}

export default General;

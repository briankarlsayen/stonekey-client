import { Box, Button, Grid } from "@mui/material";
import React from "react";
import PasswordInput from "../../components/PasswordInput";

function EditPassword() {
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PasswordInput fullWidth name="oldPassword" label="Old Password" />
        </Grid>
        <Grid item xs={12}>
          <PasswordInput fullWidth name="password" label="Password" />
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="row-reverse" pt={2} gap={2}>
        <Button type="submit" variant="contained" color="primary">
          Change
        </Button>
      </Box>
    </form>
  );
}

export default EditPassword;

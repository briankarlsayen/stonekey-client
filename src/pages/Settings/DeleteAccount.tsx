import { Box, Button, TextField, Typography } from "@mui/material";

function DeleteAccount() {
  return (
    <Box>
      <Typography pb={2}>
        Deleting your account will remove all of your information from our
        database. This cannot be undone.
      </Typography>
      <Typography variant="caption" color="gray">
        To confirm this, type "DELETE"
      </Typography>
      <TextField fullWidth />
      <Box display="flex" flexDirection="row-reverse" pt={2}>
        <Button color="error" variant="contained">
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default DeleteAccount;

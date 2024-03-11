import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function DeleteAccount() {
  const [inputText, setInputText] = useState("");
  const [isError, setError] = useState(false);
  const handleDelete = (e) => {
    e.preventDefault();
    const checkError = inputText.toLowerCase() !== "delete";
    setError(checkError);
    if (!checkError) alert("submit"); // run delete api
  };

  const updateField = (e) => {
    setError(false);
    setInputText(e.target.value);
  };

  return (
    <Box>
      <Typography pb={2}>
        Deleting your account will remove all of your information from our
        database. This cannot be undone.
      </Typography>
      <Typography variant="caption" color="gray">
        To confirm this, type "DELETE"
      </Typography>
      <form onSubmit={handleDelete}>
        <TextField
          value={inputText}
          onChange={updateField}
          fullWidth
          error={isError}
          helperText={isError ? "Invalid input" : false}
        />
        <Box display="flex" flexDirection="row-reverse" pt={2}>
          <Button type="submit" color="error" variant="contained">
            Delete
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default DeleteAccount;

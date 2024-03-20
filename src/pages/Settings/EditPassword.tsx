import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { editPasswordApi } from "../../api/api";
import BasicButton from "../../components/BasicButton";

function EditPassword() {
  const [input, setInput] = useState({
    password: "",
    newPassword: "",
  });
  const [isError, setError] = useState(false);
  const [loading, isLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("input", input);
    isLoading(true);
    const edit = await editPasswordApi(input);
    console.log("edit", edit);
    isLoading(false);

    // if (input.password !== "password") setError(true);
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
            name="password"
            value={input.password}
            fullWidth
            label="Password"
            onChange={updateField}
            error={isError}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordInput
            fullWidth
            name="newPassword"
            label="New Password"
            value={input.newPassword}
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
        <BasicButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={loading}
          disabled={!input.newPassword || !input.password}
        >
          Change
        </BasicButton>
      </Box>
    </form>
  );
}

export default EditPassword;

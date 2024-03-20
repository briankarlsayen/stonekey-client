import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { deleteAccountApi } from "../../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../components/BasicButton";

// delete account on indexdb
function DeleteAccount() {
  const [inputText, setInputText] = useState("");
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useSelector((state: RootState) => state.account);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    const checkError = inputText.toLowerCase() !== "delete";
    setError(checkError);
    if (!checkError) {
      setLoading(true);
      const response = await deleteAccountApi(id);
      setLoading(false);
      if (response.success) navigate("/login");
    }
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
          <BasicButton
            type="submit"
            color="error"
            variant="contained"
            isLoading={loading}
          >
            Delete
          </BasicButton>
        </Box>
      </form>
    </Box>
  );
}

export default DeleteAccount;

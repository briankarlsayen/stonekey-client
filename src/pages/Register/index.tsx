import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import SecretKeyModal from "../../components/SecretKeyModal";
import { routePostApi } from "../../api";
import BasicButton from "../../components/BasicButton";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";

function Register() {
  const [open, setOpen] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const handleModal = (bool: boolean) => {
    setOpen(bool);
  };
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (e) => {
    setError(false);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input.password !== input.confirmPassword) {
      setError(true);
      setErrorText("Password is not the same");
      return;
    }
    const response = await routePostApi("/signup", input);
    setLoading(false);

    if (!response.success) {
      setErrorText("Invalid Input");
      setError(true);
      return;
    }
    setSecretKey(response?.data?.message);
    handleModal(true);
  };

  return (
    <Box height="100vh">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="100%"
        px={2}
      >
        <RegisterForm
          handleSubmit={handleSubmit}
          updateField={updateField}
          input={input}
          isError={isError}
          errorText={errorText}
          isLoading={isLoading}
        />
      </Box>

      <SecretKeyModal
        open={open}
        handleClose={handleModal}
        secretKey={secretKey}
      />
    </Box>
  );
}

const RegisterForm = ({
  handleSubmit,
  input,
  updateField,
  isError,
  errorText,
  isLoading,
}) => {
  return (
    <Box maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom pb={2}>
          Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                variant="outlined"
                name="firstName"
                fullWidth
                value={input?.firstName}
                onChange={updateField}
                error={isError}
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
                error={isError}
              />
            </Grid>
            <Grid item xs={12}>
              <EmailInput
                name="emailAddress"
                label="Email"
                variant="outlined"
                fullWidth
                value={input?.emailAddress}
                onChange={updateField}
                error={isError}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={input?.password}
                onChange={updateField}
                error={isError}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                value={input?.confirmPassword}
                onChange={updateField}
                error={isError}
              />
            </Grid>
            {isError && (
              <Grid item xs={12}>
                <Typography color="error">{errorText}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <BasicButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                isLoading={isLoading}
              >
                Submit
              </BasicButton>
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

export default Register;

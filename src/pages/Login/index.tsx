import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { routePostApi } from "../../api";
import BasicButton from "../../components/BasicButton";
import {
  deleteAuthDetails,
  getAuthDetails,
  storeAuthDetails,
} from "../../api/db/dexieApi";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalError } from "../../reducers/globalReducer";

function Login() {
  const navigate = useNavigate();

  const { error } = useSelector((state: RootState) => state.global);

  const [input, setInput] = useState({
    emailAddress: "",
    password: "",
    masterKey: "",
  });
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState(error?.text ?? null);
  const [isLoading, setLoading] = useState(false);

  const [isCredStored, setCredStored] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setGlobalError({}));

    const response = await routePostApi("/login", input);
    setLoading(false);
    if (!response.success) {
      setErrorText("Invalid Credentials");
      setError(true);
      return;
    }
    await storeAuthDetails({
      accessToken: response.data.accessToken,
      masterKey: input.masterKey,
    });
    navigate("/lock-manager");
  };

  const updateField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(false);
  };

  const fetchAuthDetails = async () => {
    const authDetails = await getAuthDetails();
    if (authDetails) {
      setCredStored(true);
      return setInput({ ...input, masterKey: authDetails.masterKey });
    } else {
      return setCredStored(false);
    }
  };

  const handleDeleteStoredAcc = async () => {
    await deleteAuthDetails();
    setCredStored(false);
    setInput({ emailAddress: "", password: "", masterKey: "" });
  };

  const checkGlobalErr = () => {
    if (error?.type === "expired-jwt") {
      setError(true);
      setErrorText(error?.text);
    }
  };

  useEffect(() => {
    fetchAuthDetails();
    checkGlobalErr();
  }, []);

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
        {isCredStored ? (
          <LoginForm
            handleSubmit={handleSubmit}
            input={input}
            updateField={updateField}
            isLoading={isLoading}
            isError={isError}
            errorText={errorText}
            handleDeleteStoredAcc={handleDeleteStoredAcc}
          />
        ) : (
          <LoginFormWithMasterKey
            handleSubmit={handleSubmit}
            input={input}
            updateField={updateField}
            isLoading={isLoading}
            isError={isError}
            errorText={errorText}
          />
        )}
      </Box>
    </Box>
  );
}

const LoginForm = ({
  handleSubmit,
  input,
  updateField,
  isLoading,
  isError,
  errorText,
  handleDeleteStoredAcc,
}) => {
  return (
    <Box maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom pb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="emailAddress"
                label="Email"
                variant="outlined"
                fullWidth
                value={input?.emailAddress}
                onChange={updateField}
                type="email"
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
              />
            </Grid>

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
            {isError && (
              <Grid item xs={12}>
                <Typography color="error" fontWeight={500}>
                  {errorText}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} textAlign="end" width="100%">
              <Typography component="span">Not you? </Typography>
              <Typography
                color="#F0C029"
                component="span"
                sx={{ cursor: "pointer" }}
                onClick={handleDeleteStoredAcc}
              >
                Use another account
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box pt={2} textAlign="center">
        <Typography component="p">
          No account yet?{" "}
          <Link to="/register">
            <Typography component="span" color="#F0C029">
              Register
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

const LoginFormWithMasterKey = ({
  handleSubmit,
  input,
  updateField,
  isLoading,
  isError,
  errorText,
}) => {
  return (
    <Box maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom pb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="emailAddress"
                label="Email"
                variant="outlined"
                fullWidth
                value={input?.emailAddress}
                onChange={updateField}
                type="email"
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
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="masterKey"
                label="Master Key"
                variant="outlined"
                fullWidth
                value={input?.masterKey}
                onChange={updateField}
                multiline
                rows={3}
              />
            </Grid>

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
            {isError && (
              <Grid item xs={12}>
                <Typography color="error">{errorText}</Typography>
              </Grid>
            )}
            <Grid item xs={12} textAlign="end" width="100%">
              <Link to="/forgot-password">
                <Typography color="#F0C029">Forgot your password?</Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box pt={2} textAlign="center">
        <Typography component="p">
          No account yet?{" "}
          <Link to="/register">
            <Typography component="span" color="#F0C029">
              Register
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;

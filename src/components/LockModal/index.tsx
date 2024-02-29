import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Casino,
  Close,
  ShuffleOn,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import BasicSelect from "../BasicSelect";
import { categoryList, loginTypeList } from "./data";
import PasswordInput from "../PasswordInput";

function LockModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: "5px",
        }}
      >
        <Box pb={2} display="flex" justifyContent="space-between">
          <Typography variant="h5">Add Lock</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <LockModalForm />
      </Box>
    </Modal>
  );
}

const LockModalForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit");
  };
  const [input, setInput] = useState({
    logo: "",
    title: "",
    loginType: "username-password",
    username: "",
    password: "",
    category: "",
    website: "",
    description: "",
  });

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
          <TextField
            name="logo"
            label="Logo"
            variant="outlined"
            fullWidth
            value={input?.logo}
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={input?.title}
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            list={loginTypeList}
            name="loginType"
            label="Login Type"
            variant="outlined"
            fullWidth
            value={input.loginType}
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12}>
          <LockLoginInfo
            loginType={input.loginType}
            input={input}
            updateField={updateField}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={categoryList}
            getOptionLabel={(option) => option.text}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Category" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="website"
            label="Website"
            variant="outlined"
            fullWidth
            value={input?.website}
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            value={input?.description}
            onChange={updateField}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const LockLoginInfo = ({ loginType, input, updateField }) => {
  let details;
  const handleGeneratePassword = () => {
    console.log("generate password");
  };

  switch (loginType) {
    case "username-password":
      details = (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              value={input?.username}
              onChange={updateField}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box display="flex" gap={2}>
              <PasswordInput
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={input?.password}
                onChange={updateField}
              />

              <Button onClick={handleGeneratePassword}>
                <Casino />
              </Button>
            </Box>
          </Grid>
        </Grid>
      );
      break;
    case "gmail":
      details = (
        <Box>
          <TextField
            name="username"
            label="Email"
            variant="outlined"
            fullWidth
            value={input?.username}
            onChange={updateField}
          />
        </Box>
      );
      break;
    case "email-password":
      details = (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              name="username"
              label="Email"
              variant="outlined"
              fullWidth
              value={input?.username}
              onChange={updateField}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box display="flex" gap={2}>
              <PasswordInput
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={input?.password}
                onChange={updateField}
              />
              <Button onClick={handleGeneratePassword}>
                <Casino />
              </Button>
            </Box>
          </Grid>
        </Grid>
      );
      break;
  }
  return details;
};

export default LockModal;

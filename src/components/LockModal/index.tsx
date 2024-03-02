import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Casino, Close } from "@mui/icons-material";
import BasicSelect from "../BasicSelect";
import { categoryList, loginTypeList } from "./data";
import PasswordInput from "../PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { handleModal } from "../../reducers/lockReducer";

function LockModal() {
  const { isOpen: open, modalType } = useSelector(
    (state: RootState) => state.lock
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(handleModal({ isOpen: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "add") {
      handleAddLock();
    } else if (modalType === "edit") {
      handleEditLock();
    } else {
      dispatch(handleModal({ isOpen: true, modalType: "edit" }));
    }
  };

  const handleAddLock = () => {
    console.log("lock added");
  };

  const handleEditLock = () => {
    console.log("lock edit");
  };

  const handleCancel = () => {
    dispatch(handleModal({ isOpen: true, modalType: "view" }));
  };

  const modalTitle =
    modalType === "add"
      ? "Add Lock"
      : modalType === "edit"
      ? "Edit Lock"
      : "View Lock";

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
        <Box
          pb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">{modalTitle}</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <LockModalForm
          modalType={modalType}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </Box>
    </Modal>
  );
}

const LockModalForm = ({ modalType, handleSubmit, handleCancel }) => {
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

  const ActionButton = () => {
    switch (modalType) {
      case "view":
        return (
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Edit
          </Button>
        );
      case "add":
        return (
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        );
      case "edit":
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        );
    }
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
            disabled={modalType === "view"}
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
            disabled={modalType === "view"}
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
            disabled={modalType === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <LockLoginInfo
            loginType={input.loginType}
            input={input}
            updateField={updateField}
            modalType={modalType}
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
            disabled={modalType === "view"}
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
            disabled={modalType === "view"}
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
            disabled={modalType === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <ActionButton />
          {/* <Button type="submit" variant="contained" color="primary" fullWidth>
            Create
          </Button> */}
        </Grid>
      </Grid>
    </form>
  );
};

const LockLoginInfo = ({ loginType, input, updateField, modalType }) => {
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
              disabled={modalType === "view"}
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
                disabled={modalType === "view"}
              />

              <Button
                onClick={handleGeneratePassword}
                disabled={modalType === "view"}
              >
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
              <Button
                onClick={handleGeneratePassword}
                disabled={modalType === "view"}
              >
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

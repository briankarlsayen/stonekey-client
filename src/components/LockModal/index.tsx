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
import { useEffect, useState } from "react";
import { Casino, Close } from "@mui/icons-material";
import BasicSelect from "../BasicSelect";
// import { loginTypeList } from "./data";
import PasswordInput from "../PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { handleModal } from "../../reducers/lockReducer";
import { createLockApi } from "../../api/api";

const DEFAULT_LOGIN_TYPE_CODE = "UP";

function LockModal() {
  const { isOpen: open, modalType } = useSelector(
    (state: RootState) => state.lock
  );
  const { list } = useSelector((state: RootState) => state.loginType);

  const loginTypeList = list.map((item) => {
    return {
      _id: item._id,
      text: item.title,
      value: item.code,
      passwordRequired: item.passwordRequired,
    };
  });

  const { list: categoryList } = useSelector(
    (state: RootState) => state.category
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

  const handleAddLock = async () => {
    const addLockParams = {
      ...input,
      categoryArr: input?.categoryArr?.map((item) => item._id),
      loginTypeId: loginTypeObj?._id,
    };
    const addLock = await createLockApi(addLockParams);
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

  const [input, setInput] = useState({
    logo: "",
    title: "",
    loginTypeCode: loginTypeList[0]?.value ?? DEFAULT_LOGIN_TYPE_CODE,
    username: "",
    password: "",
    category: "",
    website: "",
    description: "",
    categoryArr: [],
  });

  const [loginTypeObj, setLoginTypeObj] = useState({
    _id: "",
    text: "username & password",
    value: "UP",
    passwordRequired: true,
  });

  const updateField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "loginTypeCode") {
      const itemObj = loginTypeList.find(
        (item) => item.value === e.target?.value
      );
      setLoginTypeObj(itemObj);
    }
  };

  const handleCategoriesChange = (e, newVal) => {
    setInput({
      ...input,
      categoryArr: newVal,
    });
  };

  // useEffect(() => {
  //   const itemObj = loginTypeList.find(
  //     (item) => item.value === DEFAULT_LOGIN_TYPE_CODE
  //   );
  //   if (itemObj) setLoginTypeObj(itemObj);
  // }, [list]);

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
          input={input}
          updateField={updateField}
          handleCategoriesChange={handleCategoriesChange}
          categoryList={categoryList}
          loginTypeList={loginTypeList}
          loginTypeObj={loginTypeObj}
        />
      </Box>
    </Modal>
  );
}

const LockModalForm = ({
  modalType,
  handleSubmit,
  handleCancel,
  input,
  updateField,
  handleCategoriesChange,
  categoryList,
  loginTypeList,
  loginTypeObj,
}) => {
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
            name="loginTypeCode"
            label="Login Type"
            variant="outlined"
            fullWidth
            value={input.loginTypeCode}
            onChange={updateField}
            disabled={modalType === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <LockLoginInfo
            loginTypeCode={input.loginTypeCode}
            input={input}
            updateField={updateField}
            modalType={modalType}
            loginTypeObj={loginTypeObj}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={categoryList}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Category" />
            )}
            disabled={modalType === "view"}
            value={input.catergoryArr}
            onChange={handleCategoriesChange}
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

const LockLoginInfo = ({
  loginTypeCode,
  loginTypeObj,
  input,
  updateField,
  modalType,
}) => {
  let details;
  const handleGeneratePassword = () => {
    console.log("generate password");
  };

  switch (loginTypeCode) {
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

  // const userNameLabel = loginTypeCode.code === 'EP';
  let userNameLabel;
  switch (loginTypeCode) {
    case "EP":
      userNameLabel = "Email";
      break;
    case "GM":
      userNameLabel = "Gmail";
      break;
    case "UP":
      userNameLabel = "Username";
      break;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <TextField
          name="username"
          label={userNameLabel}
          variant="outlined"
          fullWidth
          value={input?.username}
          onChange={updateField}
        />
      </Grid>
      {loginTypeObj.passwordRequired && (
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
      )}
    </Grid>
  );
};

export default LockModal;

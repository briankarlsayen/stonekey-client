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
import { createLockApi, editLockApi } from "../../api/api";
import { handleOpenDialog } from "../../reducers/dialogReducer";
import BasicButton from "../BasicButton";
import { refreshLocks } from "../../utils/hooks";

const DEFAULT_LOGIN_TYPE_CODE = "UP";

function LockModal() {
  const dispatch = useDispatch();
  const { isOpen: open, modalType } = useSelector(
    (state: RootState) => state.lock
  );
  const { list } = useSelector((state: RootState) => state.loginType);
  const { selected } = useSelector((state: RootState) => state.lock);
  const { list: categoryList } = useSelector(
    (state: RootState) => state.category
  );
  const [isLoading, setLoading] = useState(false);

  const loginTypeList = list.map((item) => {
    return {
      _id: item._id,
      text: item.title,
      value: item.code,
      passwordRequired: item.passwordRequired,
    };
  });

  const handleClose = () => {
    dispatch(handleModal({ isOpen: false }));
  };

  // refresh lock list on redux
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (modalType === "add") {
      await handleAddLock();
      await refreshLocks();
      dispatch(handleModal({ isOpen: false }));
    } else if (modalType === "edit") {
      await handleEditLock();
      await refreshLocks();
      dispatch(handleModal({ isOpen: false }));
    } else {
      dispatch(handleModal({ isOpen: true, modalType: "edit" }));
    }
    setLoading(false);
  };

  const handleAddLock = async () => {
    const addLockParams = {
      ...input,
      categoryArr: input?.categoryDetails?.map((item) => item._id),
      loginTypeId: loginTypeObj?._id,
    };
    await createLockApi(addLockParams);
  };

  const handleEditLock = async () => {
    console.log("lock edit", selected);
    const editLockParams = {
      ...input,
      categoryArr: input?.categoryDetails?.map((item) => item._id),
      loginTypeId: loginTypeObj?._id,
    };
    await editLockApi(selected?._id, editLockParams);
  };

  const openDeleLockDialog = () => {
    dispatch(handleOpenDialog(true));
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

  const defaultLockInput = {
    _id: "",
    logo: "",
    title: "",
    loginTypeCode: loginTypeList[0]?.value ?? DEFAULT_LOGIN_TYPE_CODE,
    username: "",
    password: "",
    category: "",
    website: "",
    description: "",
    categoryArr: [],
    categoryDetails: [],
  };

  const [input, setInput] = useState(defaultLockInput);

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
      categoryDetails: newVal,
    });
  };

  const setLockDetails = () => {
    const {
      _id,
      title,
      username,
      password,
      category,
      website,
      description,
      categoryArr,
      categoryDetails,
      loginTypeDetails,
    } = selected;
    setInput({
      ...input,
      _id,
      title,
      username,
      password,
      category,
      website,
      description,
      categoryArr,
      categoryDetails,
      loginTypeCode: loginTypeDetails?.code,
    });
    const itemObj = getLoginType(loginTypeDetails?.code);
    if (itemObj) setLoginTypeObj(itemObj);
  };

  const getLoginType = (code: string) => {
    return loginTypeList.find((item) => item.value === code);
  };

  useEffect(() => {
    // get initial login type obj

    // initial
    // view | edit
    const itemObj = getLoginType(DEFAULT_LOGIN_TYPE_CODE);

    if (itemObj) setLoginTypeObj(itemObj);
  }, [list]);

  useEffect(() => {
    if (modalType === "view" && selected) setLockDetails();
    else if (modalType === "add") setInput(defaultLockInput); // clear input
  }, [modalType]);

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
          openDeleLockDialog={openDeleLockDialog}
          isLoading={isLoading}
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
  openDeleLockDialog,
  isLoading,
}) => {
  const ActionButton = () => {
    switch (modalType) {
      case "view":
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <BasicButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Edit
            </BasicButton>
            <BasicButton
              variant="outlined"
              color="error"
              fullWidth
              onClick={openDeleLockDialog}
            >
              Delete
            </BasicButton>
          </Box>
        );
      case "add":
        return (
          <BasicButton
            isLoading={isLoading}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </BasicButton>
        );
      case "edit":
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <BasicButton
              isLoading={isLoading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </BasicButton>
            <BasicButton
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </BasicButton>
          </Box>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <TextField
            name="logo"
            label="Logo"
            variant="outlined"
            fullWidth
            value={input?.logo}
            onChange={updateField}
            disabled={modalType === "view"}
          />
        </Grid> */}
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
            value={input.categoryDetails}
            onChange={handleCategoriesChange}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
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
  const handleGeneratePassword = () => {
    console.log("generate password");
  };

  // const userNameLabel = loginTypeCode.code === 'EP';
  let userNameLabel = "";
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
          disabled={modalType === "view"}
          autoComplete="off"
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
              disabled={modalType === "view"}
              autoComplete="off"
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

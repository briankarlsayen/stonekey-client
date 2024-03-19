import { Close } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { handleCategoryModal } from "../../reducers/categoryReducer";
import { useEffect, useState } from "react";
import { createCategoryApi, editCategoryApi } from "../../api/api";
import BasicButton from "../BasicButton";
import { refreshCategories } from "../../utils/hooks";

function CategoryModal() {
  const { categoryModal, selected } = useSelector(
    (state: RootState) => state.category
  );
  const { isOpen: open, modalType } = categoryModal;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(handleCategoryModal({ isOpen: false }));
    setInput({ title: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (modalType === "add") await addCategory();
    else {
      await editCategory();
    }
    setLoading(false);
    handleClose();
    await refreshCategories();
  };

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
  });
  const updateField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const addCategory = async () => {
    await createCategoryApi(input);
  };

  const editCategory = async () => {
    await editCategoryApi(selected._id, input);
  };

  useEffect(() => {
    if (modalType === "edit") {
      setInput({ title: selected?.title });
    }
  }, [open]);

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
          <Typography variant="h5">
            {modalType === "add" ? "Add Category" : "Edit Category"}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box>
          <CategoryForm
            handleSubmit={handleSubmit}
            updateField={updateField}
            input={input}
            loading={loading}
          />
        </Box>
      </Box>
    </Modal>
  );
}

const CategoryForm = ({ handleSubmit, input, updateField, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Name"
              variant="outlined"
              fullWidth
              value={input?.title}
              onChange={updateField}
              focused
            />
          </Grid>
          <Grid item xs={12}>
            <BasicButton
              fullWidth
              variant="contained"
              type="submit"
              isLoading={loading}
            >
              Submit
            </BasicButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default CategoryModal;

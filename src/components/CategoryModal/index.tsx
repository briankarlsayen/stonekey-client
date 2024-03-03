import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { handleCategoryModal } from "../../reducers/categoryReducer";
import { useState } from "react";

function CategoryModal() {
  const categoryState = useSelector((state: RootState) => state.category);
  const { isOpen: open, modalType } = categoryState?.categoryModal;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(handleCategoryModal({ isOpen: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit edit category");
  };

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
          <CategoryForm handleSubmit={handleSubmit} />
        </Box>
      </Box>
    </Modal>
  );
}

const CategoryForm = ({ handleSubmit }) => {
  const [input, setInput] = useState({
    name: "",
  });
  const updateField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={input?.name}
              onChange={updateField}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default CategoryModal;

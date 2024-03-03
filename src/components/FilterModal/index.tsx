import { Close, EditNoteSharp } from "@mui/icons-material";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { handleFilterModal } from "../../reducers/lockReducer";
import { categoryList } from "../LockModal/data";
import BasicSelect from "../BasicSelect";
import { sortTypeList } from "./data";
import { useNavigate } from "react-router-dom";

function FilterModal() {
  const lockState = useSelector((state: RootState) => state.lock);
  const navigate = useNavigate();
  const open = lockState?.filterModal?.isOpen;

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(handleFilterModal({ isOpen: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("lock filter");
  };

  const [input, setInput] = useState({
    sort: "updatedAt-asc",
    categories: [],
  });

  const updateField = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoriesChange = (e, newVal) => {
    setInput({
      ...input,
      categories: newVal,
    });
  };

  const openCategoryModal = () => {
    // dispatch(handleCategoryModal({ isOpen: true }));
    dispatch(handleFilterModal({ isOpen: false }));
    navigate("/lock-manager/category");
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
          <Typography variant="h5">Filter Locks</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <FilterModalForm
          handleSubmit={handleSubmit}
          input={input}
          updateField={updateField}
          handleCategoriesChange={handleCategoriesChange}
          openCategoryModal={openCategoryModal}
        />
      </Box>
    </Modal>
  );
}

const FilterModalForm = ({
  handleSubmit,
  input,
  updateField,
  handleCategoriesChange,
  openCategoryModal,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BasicSelect
            list={sortTypeList}
            name="sort"
            label="Sort"
            variant="outlined"
            fullWidth
            value={input.sort}
            onChange={updateField}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={2} alignItems="center">
            <Autocomplete
              fullWidth
              multiple
              options={categoryList}
              getOptionLabel={(option) => option.text}
              onChange={handleCategoriesChange}
              value={input.categories}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Categories"
                />
              )}
            />
            <Box>
              <IconButton onClick={openCategoryModal}>
                <EditNoteSharp />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FilterModal;

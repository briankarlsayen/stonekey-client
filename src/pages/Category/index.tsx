import { Box, Button, Typography } from "@mui/material";
import CategoryModal from "../../components/CategoryModal";
import CategoryTable from "../../components/CategoryTable";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { handleCategoryModal } from "../../reducers/categoryReducer";
import DeleteModal from "../../components/DeleteModal";
import { handleDeleteModal } from "../../reducers/globalReducer";

function Category() {
  const dispatch = useDispatch();
  const handleAddButton = () => {
    dispatch(
      handleCategoryModal({
        isOpen: true,
        modalType: "add",
      })
    );
  };

  const handleDelete = () => {
    // delete category api here
    console.log("run delete category");
    dispatch(
      handleDeleteModal({
        isOpen: false,
      })
    );
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
      >
        <Typography variant="h5">Category List</Typography>

        <Button variant="contained" onClick={handleAddButton}>
          <Add />
          Add
        </Button>
      </Box>
      <CategoryTable />
      <CategoryModal />
      <DeleteModal
        description="Do you want to delete this category?"
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default Category;

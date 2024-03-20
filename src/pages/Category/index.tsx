import { Box, Button, Paper, Typography } from "@mui/material";
import CategoryModal from "../../components/CategoryModal";
import CategoryTable from "../../components/CategoryTable";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { handleCategoryModal } from "../../reducers/categoryReducer";
import DeleteModal from "../../components/DeleteModal";
import { handleDeleteModal } from "../../reducers/globalReducer";
import { RootState } from "../../store";

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

  const { list: categoryList } = useSelector(
    (state: RootState) => state.category
  );

  return (
    <Box py={2}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={2}
          >
            <Typography variant="h5">Categories</Typography>

            <Button variant="contained" onClick={handleAddButton}>
              <Add />
              Add
            </Button>
          </Box>
          <Box>
            <CategoryTable categoryList={categoryList} />
          </Box>
          <CategoryModal />
          <DeleteModal
            description="Do you want to delete this category?"
            handleDelete={handleDelete}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default Category;

import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleCategoryModal } from "../../reducers/categoryReducer";
import { handleDeleteModal } from "../../reducers/globalReducer";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  padding: 8,
}));

const CategoryTable = ({ categoryList }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Function to handle delete action
  const handleDelete = (id) => {
    // Implement your delete logic here
    const categoryDetails = categoryList.find((e) => e._id === id);
    dispatch(handleDeleteModal({ isOpen: true }));
    dispatch(
      handleCategoryModal({
        isOpen: false,
        modalType: null,
        selected: categoryDetails,
      })
    );
  };

  const handleEdit = (id) => {
    const categoryDetails = categoryList.find((e) => e._id === id);
    dispatch(
      handleCategoryModal({
        isOpen: true,
        modalType: "edit",
        selected: categoryDetails,
      })
    );
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {/* <Paper elevation={3}> */}
      <TableContainer
        sx={{ borderRadius: "5px", border: "1px solid lightGray" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ paddingY: 2.5 }}>Name</StyledTableCell>
              <StyledTableCell width={150}>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? categoryList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : categoryList
            ).map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell>{item.title}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleEdit(item._id)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(item._id)}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Paper> */}
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={categoryList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CategoryTable;

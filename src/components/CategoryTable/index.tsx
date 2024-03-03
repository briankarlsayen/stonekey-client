import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Paper,
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
  padding: 12,
}));

const CategoryTable = () => {
  const generateData = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));
  const dispatch = useDispatch();

  const [data, setData] = useState(generateData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Function to handle delete action
  const handleDelete = (id) => {
    // Implement your delete logic here
    dispatch(handleDeleteModal({ isOpen: true }));
    console.log(`Delete item with id: ${id}`);
  };

  const handleEdit = (id) => {
    dispatch(handleCategoryModal({ isOpen: true, modalType: "edit" }));
    console.log(`Edit item with id: ${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Paper elevation={3}>
        <TableContainer sx={{ borderRadius: "5px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ paddingY: 2.5 }}>Name</StyledTableCell>
                <StyledTableCell width={150}>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton onClick={() => handleEdit(item.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item.id)}
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
      </Paper>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default CategoryTable;

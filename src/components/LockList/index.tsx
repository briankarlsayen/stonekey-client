import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockCard from "../LockCard";
import { Add, Tune } from "@mui/icons-material";
import { handleFilterModal, handleModal } from "../../reducers/lockReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

function LockList({ locks }) {
  const dispatch = useDispatch();
  const lockState = useSelector((state: RootState) => state.lock);
  const handleAddButton = () => {
    dispatch(handleModal({ isOpen: !lockState.isOpen, modalType: "add" }));
  };

  const handleFilter = () => {
    dispatch(handleFilterModal({ isOpen: true }));
  };

  return (
    <Paper elevation={3}>
      <Box p={4}>
        <Box pb={2} display="flex" justifyContent="space-between" gap={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField fullWidth placeholder="Search" size="small" />
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                display="flex"
                gap={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>Saved Password(134)</Typography>
                <Box>
                  <IconButton onClick={handleFilter}>
                    <Tune />
                  </IconButton>
                  <Button variant="contained" onClick={handleAddButton}>
                    <Add />
                    Add
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" gap={2}></Box>
        </Box>

        <Grid container spacing={2}>
          {locks.map((lock, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <LockCard {...lock} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default LockList;

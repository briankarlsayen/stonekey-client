import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LockCard from "../LockCard";
import { Add } from "@mui/icons-material";
function LockList({ locks, handleOpen }) {
  return (
    <Paper elevation={3}>
      <Box p={4}>
        <Box pb={2} display="flex" justifyContent="space-between" gap={2}>
          <Typography>Saved Password(134)</Typography>
          <TextField fullWidth placeholder="search" size="small" />
          <Box>
            <Button variant="contained">
              <Add />
              Add
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {locks.map((lock, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <LockCard {...lock} handleOpen={handleOpen} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default LockList;

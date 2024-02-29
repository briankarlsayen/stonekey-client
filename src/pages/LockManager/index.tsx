import { Box, Pagination } from "@mui/material";
import { useState } from "react";
import LockList from "../../components/LockList";
import LockModal from "../../components/LockModal";

function LockManager() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 16;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
  };
  const cardsData = [
    {
      id: 1,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 2,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 3,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 4,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 5,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 6,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 1,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 2,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 3,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 4,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 5,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 6,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 1,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 2,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 3,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 4,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 5,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 6,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 1,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 2,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 3,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 4,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 5,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 6,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 1,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 2,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 3,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 4,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 5,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 6,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 1,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 2,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 3,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 4,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 5,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
    {
      id: 6,
      title: "google",
      username: "blu3fire89@gmail.com",
      password: "123",
    },
  ];
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box height="100%">
      <Box py={2}>
        <LockList locks={currentCards} handleOpen={handleOpen} />
      </Box>
      <Pagination
        color="primary"
        count={Math.ceil(cardsData.length / cardsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ float: "right" }}
      />
      <LockModal open={open} handleClose={handleClose} />
    </Box>
  );
}

export default LockManager;

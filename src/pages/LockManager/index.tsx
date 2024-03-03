import { Box, Pagination } from "@mui/material";
import { useState } from "react";
import LockList from "../../components/LockList";
import LockModal from "../../components/LockModal";
import FilterModal from "../../components/FilterModal";
import CategoryModal from "../../components/CategoryModal";

function LockManager() {
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

  return (
    <Box height="100%">
      <Box py={2}>
        <LockList locks={currentCards} />
      </Box>
      <Pagination
        color="primary"
        count={Math.ceil(cardsData.length / cardsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ float: "right" }}
      />
      {/* modals */}
      <LockModal />
      <FilterModal />
      <CategoryModal />
    </Box>
  );
}

export default LockManager;

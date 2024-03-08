import { Box, Pagination, useMediaQuery } from "@mui/material";
import { useState } from "react";
import LockList from "../../components/LockList";
import LockModal from "../../components/LockModal";
import FilterModal from "../../components/FilterModal";
import CategoryModal from "../../components/CategoryModal";
import { cardsData } from "./data";
import theme from "../../theme";

function LockManager() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 16;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
  };

  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);
  // const mobileSize = false;
  const mobileSize = useMediaQuery(theme.breakpoints.down("lg"));

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
        sx={{
          float: "right",
          // paddingBottom: "5rem",
          paddingBottom: mobileSize ? "6rem" : 0,
        }}
      />
      {/* modals */}
      <LockModal />
      <FilterModal />
      <CategoryModal />
    </Box>
  );
}

export default LockManager;

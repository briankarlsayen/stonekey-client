import { Box, Pagination, useMediaQuery } from "@mui/material";
import { useState } from "react";
import LockList from "../../components/LockList";
import LockModal from "../../components/LockModal";
import FilterModal from "../../components/FilterModal";
import CategoryModal from "../../components/CategoryModal";
import { cardsData } from "./data";
import theme from "../../theme";
import { deleteLockApi } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { handleModal } from "../../reducers/lockReducer";
import { RootState } from "../../store";
import BasicDialog from "../../components/BasicDialog";
import { handleOpenDialog } from "../../reducers/dialogReducer";
import { refreshLocks } from "../../utils/hooks";

function LockManager() {
  const dispatch = useDispatch();
  const { list, selected } = useSelector((state: RootState) => state.lock);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 16;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
  };

  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);
  const mobileSize = useMediaQuery(theme.breakpoints.down("lg"));

  const { open } = useSelector((state: RootState) => state.dialog);

  const deleteLock = async () => {
    await deleteLockApi(selected?._id);
    await refreshLocks();
    dispatch(handleOpenDialog(false));
    dispatch(handleModal({ isOpen: false }));
  };

  const deleteLockDialogDetails = {
    open,
    title: "Are you sure you want to delete lock?",
    content: "Press delete to delete lock permanently.",
    handleContinue: deleteLock,
    color: "error",
    continueLabel: "Delete",
  };

  return (
    <Box height="100%">
      <Box py={2}>
        <LockList locks={list} />
      </Box>
      <Pagination
        color="primary"
        count={Math.ceil(list.length / cardsPerPage)}
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
      <BasicDialog {...deleteLockDialogDetails} />
    </Box>
  );
}

export default LockManager;

import { Box, Button, Pagination, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import LockList from "../../components/LockList";
import LockModal from "../../components/LockModal";
import FilterModal from "../../components/FilterModal";
import CategoryModal from "../../components/CategoryModal";
import { cardsData } from "./data";
import theme from "../../theme";
import { getCategoriesApi, getLocksApi, getLoginTypesApi } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../reducers/categoryReducer";
import { setLoginTypes } from "../../reducers/loginTypeReducer";
import { setLocks } from "../../reducers/lockReducer";
import { RootState } from "../../store";
import BasicDialog from "../../components/BasicDialog";
import { setDialog } from "../../reducers/dialogReducer";

function LockManager() {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.lock);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 16;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const handlePageChange = (_event, value) => {
    setCurrentPage(value);
  };

  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);
  const [lockList, setLockList] = useState([]);
  // const mobileSize = false;
  const mobileSize = useMediaQuery(theme.breakpoints.down("lg"));

  // const fetchLockData = async () => {
  //   await getLocksApi();
  // };

  const fetchDatas = async () => {
    await getCategoriesApi().then((res) => dispatch(setCategories(res)));
    await getLoginTypesApi().then((res) => dispatch(setLoginTypes(res)));
    await getLocksApi().then((res) => dispatch(setLocks(res)));
  };
  console.log("list", list);

  useEffect(() => {
    fetchDatas();
  }, []);

  // const [open, setOpen] = useState(false);

  const openDeleLockDialog = () => {
    // setOpen(true);
    dispatch(
      setDialog({
        open: true,
        title: "Are you sure you want to delete lock",
        content: "Press continue to delete lock permanently.",
        // handleContinue: handleDeleteLock.toString(),
      })
    );
  };

  const { open, title, content } = useSelector(
    (state: RootState) => state.dialog
  );

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
      <Button onClick={openDeleLockDialog}>Open</Button>
      {/* modals */}
      <LockModal />
      <FilterModal />
      <CategoryModal />
      <BasicDialog open={open} title={title} content={content} />
    </Box>
  );
}

export default LockManager;

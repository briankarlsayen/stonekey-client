import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import {
  getAccountApi,
  getCategoriesApi,
  getLocksApi,
  getLoginTypesApi,
} from "../api/api";
import { useDispatch } from "react-redux";
import { setLocks } from "../reducers/lockReducer";
import { setLoginTypes } from "../reducers/loginTypeReducer";
import { setCategories } from "../reducers/categoryReducer";
import { useEffect, useState } from "react";
import { setAccountDetails } from "../reducers/accountReducer";
import PageNotFound from "../pages/NotFound";
import NoMatch from "../pages/NoMatch";

function Layout() {
  console.log("refresh layout");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchDatas = async () => {
    try {
      setLoading(true);
      await getAccountApi()
        .then((res) => dispatch(setAccountDetails(res)))
        .catch((error) => setError(true));
      await getCategoriesApi().then((res) => dispatch(setCategories(res)));
      await getLoginTypesApi().then((res) => dispatch(setLoginTypes(res)));
      await getLocksApi().then((res) => dispatch(setLocks(res)));
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log("errasdas", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);
  console.log("error", error);

  const content = () => {
    switch (true) {
      case error:
        return <NoMatch />;
      case loading:
        return (
          <Box>
            <Typography>Loading...</Typography>
          </Box>
        );
      default:
        return (
          <Box display="flex">
            <Box flex={1}>
              <Navbar />
              <Box display="flex" width="100%" justifyContent="center">
                <Box maxWidth="lg" width="100%" p={2}>
                  <Outlet />
                </Box>
              </Box>
            </Box>
          </Box>
        );
    }
  };

  return content();
}

export default Layout;

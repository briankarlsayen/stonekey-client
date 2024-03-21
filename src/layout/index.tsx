import { Box, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
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
import NoMatch from "../pages/NoMatch";
import Spinner from "../assets/chick-spinner.gif";
import { setGlobalError } from "../reducers/globalReducer";

function Layout() {
  console.log("refresh layout");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const fetchDatas = async () => {
    try {
      setLoading(true);
      await getAccountApi().then((res) => {
        if (res?.success) dispatch(setAccountDetails(res.data));
        else {
          // if token expired
          if (res.name === "TokenExpiredError") {
            dispatch(
              setGlobalError({
                type: "expired-jwt",
                text: "Your session has expired",
              })
            );
            navigate("/login");
          } else if (res.name === "JsonWebTokenError") {
            dispatch(
              setGlobalError({
                type: "no-token",
              })
            );
          }

          // if no token or others, show error page
          setError(true);
        }
      });

      await getCategoriesApi().then(
        (res) => res && dispatch(setCategories(res))
      );
      await getLoginTypesApi().then(
        (res) => res && dispatch(setLoginTypes(res))
      );
      await getLocksApi().then((res) => res && dispatch(setLocks(res)));
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const content = () => {
    switch (true) {
      case error:
        return <NoMatch />;
      // case loading:
      //   return (
      //     <Box
      //       display="flex"
      //       justifyContent="center"
      //       height="100vh"
      //       alignItems="center"
      //     >
      //       <Box textAlign="center">
      //         <img src={Spinner} alt="loading-icon" />
      //         <Typography variant="h6">Loading files, please wait</Typography>
      //       </Box>
      //     </Box>
      //   );
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

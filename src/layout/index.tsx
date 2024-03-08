import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";

function Layout() {
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

export default Layout;

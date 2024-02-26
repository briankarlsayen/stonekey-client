import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <Box display="flex">
      <Box flex={1}>
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Box p={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  console.log("toggleSidebar", toggleSidebar);
  console.log("isSidebarOpen", isSidebarOpen);
  return (
    <Box
      bgcolor="primary.main"
      width="100%"
      height="3rem"
      display="flex"
      alignItems="center"
    >
      <Typography>Stonekey</Typography>
      <Box display="flex" flexDirection="row" gap={2}>
        <Typography>Lock Manager</Typography>
        <Typography>Secured Notes</Typography>
      </Box>
    </Box>
  );
};

export default Layout;

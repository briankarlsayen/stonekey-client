import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Key, Logout, Settings, Download } from "@mui/icons-material/";
import "./index.css";

type SelectedItems = "locks" | "notes";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const [selectedItem, setSelectedItem] = useState<SelectedItems>("locks");

  const handleItemClick = (itemName: SelectedItems) => {
    setSelectedItem(itemName);
  };

  return (
    <Box display="flex">
      <Box flex={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleItemClick={handleItemClick}
          selectedItem={selectedItem}
        />
        <Box display="flex" width="100%" justifyContent="center">
          <Box maxWidth="lg" width="100%" p={2}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const Navbar = ({
  isSidebarOpen,
  toggleSidebar,
  handleItemClick,
  selectedItem,
}) => {
  return (
    <Box
      bgcolor="primary.main"
      width="100%"
      height="3rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        maxWidth="lg"
        width="100%"
        px={2}
        justifyContent="space-between"
      >
        <Box display="flex">
          <Box display="flex" alignItems="center">
            <Key />
            <Typography fontWeight="800">Stonekey</Typography>
          </Box>
          <Box display="flex" flexDirection="row" gap={2} pl={4}>
            <Typography
              className={`navbar-item ${
                selectedItem === "locks" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("locks")}
              sx={{ cursor: "pointer" }}
            >
              Lock Manager
            </Typography>
            <Typography
              className={`navbar-item ${
                selectedItem === "notes" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("notes")}
              sx={{ cursor: "pointer" }}
            >
              Secured notes
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <IconButton color="secondary">
            <Download sx={{ cursor: "pointer" }} />
          </IconButton>
          <IconButton color="secondary">
            <Settings sx={{ cursor: "pointer" }} />
          </IconButton>
          <IconButton color="secondary">
            <Logout sx={{ cursor: "pointer" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

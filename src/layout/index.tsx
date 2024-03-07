import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Key, Logout, Settings, Download } from "@mui/icons-material/";
import "./index.css";

type SelectedItems = "lock-manager" | "notes";

function Layout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const [selectedItem, setSelectedItem] =
    useState<SelectedItems>("lock-manager");

  const handleItemClick = (itemName: SelectedItems) => {
    setSelectedItem(itemName);
    navigate(itemName);
  };

  return (
    <Box display="flex">
      <Box flex={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          handleItemClick={handleItemClick}
          selectedItem={selectedItem}
          navigate={navigate}
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
  navigate,
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
                selectedItem === "lock-manager" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("lock-manager")}
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
          <IconButton color="secondary" onClick={() => navigate("settings")}>
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

// Navbar.js

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { Download, Logout, Menu, Settings } from "@mui/icons-material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";

type SelectedItems = "lock-manager" | "notes";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const desktopSize = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] =
    useState<SelectedItems>("lock-manager");

  const handleItemClick = (itemName: SelectedItems) => {
    setSelectedItem(itemName);
    navigate(itemName);
  };

  const handleLogoClick = () => navigate("/lock-manager");

  const navbarItems = [
    {
      text: "Lock Manager",
      value: "lock-manager",
    },
    {
      text: "Secured Notes",
      value: "notes",
    },
  ];

  return (
    <div>
      <AppBar position="static">
        {desktopSize ? (
          <DesktopView
            navigate={navigate}
            handleItemClick={handleItemClick}
            selectedItem={selectedItem}
            handleLogoClick={handleLogoClick}
            navbarItems={navbarItems}
          />
        ) : (
          <MobileView
            toggleDrawer={toggleDrawer}
            navigate={navigate}
            handleLogoClick={handleLogoClick}
          />
        )}
      </AppBar>

      {!desktopSize && (
        <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List>
            {navbarItems.map((item) => (
              <ListItem key={item.value} onClick={toggleDrawer(false)}>
                <ListItemButton
                  onClick={() => handleItemClick(item.value as SelectedItems)}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </div>
  );
};

const DesktopView = ({
  navigate,
  selectedItem,
  handleItemClick,
  handleLogoClick,
  navbarItems,
}) => {
  return (
    <Toolbar>
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" maxWidth="lg" width="100%">
          <Box display="flex" flexGrow={1} alignItems="center">
            <Typography
              variant="h6"
              component="div"
              onClick={handleLogoClick}
              sx={{ cursor: "pointer" }}
            >
              Stonekey
            </Typography>
            <Box display="flex" flexDirection="row" gap={2} pl={4}>
              {navbarItems.map((item, index) => (
                <Typography
                  key={index}
                  className={`navbar-item ${
                    selectedItem === item.value ? "selected" : ""
                  }`}
                  onClick={() => handleItemClick(item.value)}
                  sx={{ cursor: "pointer" }}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          </Box>
          <LeftNavbar navigate={navigate} />
        </Box>
      </Box>
    </Toolbar>
  );
};

const MobileView = ({ toggleDrawer, navigate, handleLogoClick }) => {
  return (
    <Toolbar>
      <Button color="inherit" onClick={toggleDrawer(true)}>
        <Menu />
      </Button>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, cursor: "pointer" }}
        onClick={handleLogoClick}
      >
        Stonekey
      </Typography>
      <LeftNavbar navigate={navigate} />
    </Toolbar>
  );
};

const LeftNavbar = ({ navigate }) => {
  return (
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
  );
};

export default Navbar;

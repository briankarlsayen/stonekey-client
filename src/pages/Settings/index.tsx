import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import General from "./General";
import EditPassword from "./EditPassword";
import DeleteAccount from "./DeleteAccount";
function Settings() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/lock-manager");
  };

  const [selected, setSelected] = useState("general");
  const handleSidebarClick = (item: string) => {
    setSelected(item);
  };

  const sidebarList = [
    {
      text: "General",
      value: "general",
    },
    {
      text: "Password",
      value: "edit-password",
    },
    {
      text: "Delete Account",
      value: "delete-acc",
    },
  ];

  return (
    <Box>
      <Box pb={2}>
        <Typography component="span">brian sayen /</Typography>
        <Typography pb={2} fontWeight={600} component="span">
          {" "}
          Settings
        </Typography>
      </Box>
      <SettingsForm
        handleCancel={handleCancel}
        handleSidebarClick={handleSidebarClick}
        sidebarList={sidebarList}
        selected={selected}
      />
    </Box>
  );
}

const SettingsForm = ({
  handleCancel,
  handleSidebarClick,
  sidebarList,
  selected,
}) => {
  const contentTitle = sidebarList?.find(
    (item) => item.value === selected
  ).text;

  const content = () => {
    switch (selected) {
      case "general":
        return <General />;
      case "edit-password":
        return <EditPassword />;
      case "delete-acc":
        return <DeleteAccount />;
    }
  };

  return (
    <Box width="100%">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom pb={2}>
          Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={2}>
              {sidebarList.map((item, index) => (
                <Typography
                  key={index}
                  fontWeight={selected === item.value ? 600 : 400}
                  onClick={() => handleSidebarClick(item.value)}
                  sx={{ cursor: "pointer" }}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={8} borderLeft="1px solid lightGray">
            {/* <Typography>{contentTitle}</Typography> */}
            {content()}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Settings;

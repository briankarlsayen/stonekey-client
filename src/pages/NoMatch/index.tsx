import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NoMatch() {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/lock-manager");
  };
  return (
    <Box height="100vh" display="flex" alignItems="center">
      <Container
        maxWidth="sm"
        style={{
          textAlign: "center",
        }}
      >
        <Typography variant="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" color="textSecondary" paragraph>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for might be under construction or does not
          exist.
        </Typography>
        <Button onClick={handleBackToHome} variant="contained">
          Go to Home
        </Button>
      </Container>
    </Box>
  );
}

export default NoMatch;

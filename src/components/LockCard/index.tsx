import { Avatar, Box, Typography } from "@mui/material";

const boxSx = {
  cursor: "pointer",
  "&:hover": {
    border: "2px solid #372e29",
    color: "white",
    backgroundColor: "#726255",
  },
};

function LockCard(props) {
  return (
    <Box
      p={2}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      border="2px solid #f0c75e"
      borderRadius="5px"
      sx={boxSx}
      onClick={props.handleOpen}
    >
      <Avatar
        variant="square"
        sx={{ width: 56, height: 56, bgcolor: "#ecb939" }}
      >
        <Typography variant="h4">{props.title.slice(0, 1)}</Typography>
      </Avatar>
      <Typography variant="h6" pt={2}>
        {props.title}
      </Typography>
      <Typography>{props.username}</Typography>
    </Box>
  );
}

export default LockCard;

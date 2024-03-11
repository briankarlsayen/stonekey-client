import { Close, CopyAll, Download, WarningAmber } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SecretKeyModal({ open, handleClose, secretKey }) {
  const [isCopied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
  };
  const navigate = useNavigate();

  const handleDownload = () => {
    const fileName = "secretkey";
    const element = document.createElement("a");
    const file = new Blob([secretKey], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const closeModal = () => {
    navigate("/login");
    handleClose(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: "5px",
        }}
      >
        <Box
          pb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Secret Key</Typography>
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </Box>

        <SecretKeyContainer secretKey={secretKey} handleCopy={handleCopy} />
        <Box display="flex" flexDirection="row-reverse" pt={2} gap={2}>
          <Button variant="contained" onClick={handleDownload}>
            <Download />
            Download
          </Button>
          {isCopied && <Button disabled>Copied</Button>}
        </Box>
      </Box>
    </Modal>
  );
}

const SecretKeyContainer = ({ secretKey, handleCopy }) => {
  return (
    <Box>
      <Box display="flex">
        <Typography flexGrow={1}>{secretKey}</Typography>
        <Tooltip title="Copy">
          <IconButton onClick={handleCopy}>
            <CopyAll />
          </IconButton>
        </Tooltip>
      </Box>
      <Box display="flex" alignItems="center" pt={2} gap={0.5}>
        <WarningAmber color="warning" />
        <Typography variant="subtitle2" color="gray">
          Make sure to save this secret key in a secured storage{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default SecretKeyModal;

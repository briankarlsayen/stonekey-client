import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteModal } from "../../reducers/globalReducer";
import { useState } from "react";
import BasicButton from "../BasicButton";

interface DeleteModalProps {
  description: string;
  handleDelete: () => void;
}

function DeleteModal({ description, handleDelete }: DeleteModalProps) {
  const globalState = useSelector((state: RootState) => state.global);
  const [loading, setLoading] = useState(false);
  const { isOpen: open } = globalState?.deleteModal;
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(handleDeleteModal({ isOpen: false }));
  };

  const handleClickDelete = async () => {
    setLoading(true);
    await handleDelete();
    setLoading(false);
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
          maxWidth: 450,
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
          <Typography variant="h5">Are You Sure</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box>
          <Typography pb={2}>{description}</Typography>
          <Box display="flex" flexDirection="row-reverse" gap={2}>
            <BasicButton
              isLoading={loading}
              variant="contained"
              color="error"
              onClick={handleClickDelete}
            >
              Delete
            </BasicButton>
            <BasicButton
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </BasicButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteModal;

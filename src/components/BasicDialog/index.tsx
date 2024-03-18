import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenDialog } from "../../reducers/dialogReducer";
import BasicButton from "../BasicButton";
import { useState } from "react";

function BasicDialog({
  open,
  title,
  content,
  handleContinue,
  color,
  continueLabel,
}) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const handleCancel = () => dispatch(handleOpenDialog(false));

  const clickContinue = async () => {
    setLoading(true);
    await handleContinue();
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <BasicButton
          autoFocus
          onClick={clickContinue}
          isLoading={isLoading}
          color={color}
          variant="contained"
        >
          {continueLabel}
        </BasicButton>
      </DialogActions>
    </Dialog>
  );
}

export default BasicDialog;

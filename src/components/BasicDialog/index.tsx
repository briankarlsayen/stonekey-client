import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeDialog } from "../../reducers/dialogReducer";
import { useEffect } from "react";

function BasicDialog({ open, title, content }) {
  const dispatch = useDispatch();
  const handleCancel = () => dispatch(closeDialog());
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
        <Button onClick={handleCancel}>Cancel</Button>
        <Button autoFocus>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BasicDialog;

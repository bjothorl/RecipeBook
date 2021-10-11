import React, { MouseEventHandler, ReactElement } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  title: string;
  open: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
}

export default function AlertDialog({
  title,
  open,
  onClose,
  onConfirm,
}: Props): ReactElement {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {""}
        </DialogContentText>
      </DialogContent>
      {onClose && (
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            cancel
          </Button>
          <Button onClick={onConfirm} color="primary">
            confirm
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

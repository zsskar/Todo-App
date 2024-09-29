import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

interface Props {
    handleClose: () => void; 
    deleteAfterConfirmation : () => void;
    open : boolean;
  }

export default function ConfirmationDialog({handleClose, deleteAfterConfirmation, open} : Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Todo delete confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Are you sure want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={deleteAfterConfirmation} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
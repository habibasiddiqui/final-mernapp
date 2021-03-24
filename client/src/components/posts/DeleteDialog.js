import React, { useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { Button } from "react-bootstrap";

function DeleteDialog(props) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    props.handleDelete(props.id);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

//   console.log(props)

    return (
        <div>
            <Button variant="danger" 
                    size="sm"
                    onClick={handleClickOpen}>
                    Delete
            </Button>
            <Dialog
              fullWidth={true}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
    
              <DialogActions>
                <Button onClick={handleClose} variant="light">
                  Cancel
                </Button>
                <Button onClick={handleConfirm} variant="primary" >
                  Confirm Delete
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteDialog

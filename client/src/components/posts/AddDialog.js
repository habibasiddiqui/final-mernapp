import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Divider } from "@material-ui/core";
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SubjectIcon from '@material-ui/icons/Subject';
import ImageIcon from '@material-ui/icons/Image';
import axios from "axios";
import { useHistory } from "react-router-dom";
import FileBase64 from 'react-file-base64';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

// //////////////////////////////////////////////////////////////////////////////

export default function AddDialog(props) {
  // console.log(props);

  let {
    open, setOpen, handleClose,
    reload, setReload
  } = props

  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const history = useHistory();

  const [token, settoken] = useState(null);
  const [name, setname] = useState(null);

  useEffect(() => {
    const checkOnlineUser = JSON.parse(localStorage.getItem("userData"));
    if (checkOnlineUser === null) {
      history.push('/signin')
    }
    else {
      let { token, name } = checkOnlineUser
      settoken(token);
      if (!token)
        history.push('/signin');
      setname(name);
    }
  }, [reload])

  // submit new post in admin mode
  const handleSubmit = (e) => {
    e.preventDefault();


    let post = { title, body, image };
    // console.log(user)
    axios.post("http://localhost:4000/api/posts", post, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then((res) => {
        console.log(res.data);
        setReload(!reload);
        history.push("/posts");

      })
      .catch((err) => console.log(err, "error"));
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add New Post
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid
              className="signup-inputs"
              container
              spacing={1}
              alignItems="flex-end"
            >
              <Grid item xs={1}>
                <TextFieldsIcon className="icon" />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Title"
                  className="input-textfield"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              className="signup-inputs"
              container
              spacing={1}
              alignItems="flex-end"
            >
              <Grid item xs={1}>
                <SubjectIcon className="icon" />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  multiline rows={4}
                  className="input-textfield"
                  label="Body"
                  onChange={(e) => setBody(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              className="signup-inputs"
              container
              spacing={1}
              alignItems="flex-end"
            >
              <Grid item xs={1}>
                <ImageIcon className="icon" />
              </Grid>
              <Grid item xs={11}>
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) => setImage(base64)}>

                </FileBase64>
              </Grid>
            </Grid>

            <DialogActions>
              <Button className="submit" autoFocus type="submit">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import { useHistory, useParams } from "react-router-dom";
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

// ////////////////////////////////////////////////////////////////////////////////////////

export default function EditDialog(props) {
  // console.log(props);
  let { id } = useParams();
  let {  
    open, setOpen, handleClose,
    oldData,
  } = props;

  // console.log(oldData);

  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');
  let [image, setImage] = useState('');
  let [post, setPost] = useState('');

  const history = useHistory();

  // // for alert if email already exists
  // const [unique, setUnique] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/posts/" + oldData._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setTitle(data.data.title);
        setBody(data.data.body);
        setImage(data.data.image);
      })
      .catch((err) => console.log(err));
  }, [oldData._id]);

  // edit  user
  const handleSubmit = (e) => {
    e.preventDefault();
    let updated = { title, body, image, createdAt: oldData.createdAt, _id: oldData._id,
      _v: oldData._v,      
      updatedAt: new Date(),
     };
    console.log(updated);
    axios.post(`http://localhost:4000/api/posts/edit/${oldData._id}`, updated)
      .then((res) => {
        console.log(res.data);
        // setUnique(res.data.unique);
        // if (unique) console.log("Email created");
        // else console.log("Email already exists");
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
          Edit Post
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
                  defaultValue={oldData.title}
                  label="Title"
                  className="input-textfield"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* <Grid
              className="signup-inputs"
              container
              spacing={1}
              alignItems="flex-end"
            >
              <Grid item xs={1}>
                <EmailIcon className="icon" />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  className="input-textfield"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid> */}

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
                  defaultValue={oldData.body}
                  className="input-textfield"
                  label="Body"
                  multiline rows={4}
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
                <img src={oldData.image} width='100px'/>
                <FileBase64
                    multiple={false}
                    onDone={({base64})=>setImage(base64)}>
                </FileBase64>
              </Grid>
            </Grid>

            <DialogActions>
              <Button className="submit" autoFocus type="submit">
                Edit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

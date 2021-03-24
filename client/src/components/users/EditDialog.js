import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Divider } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

export default function EditDialog(props) {
  // console.log(props);

  let {  
    open, setOpen, handleClose,
    oldData,
  } = props;

  // console.log(oldData);

  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  const history = useHistory();

  // // for alert if email already exists
  // const [unique, setUnique] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/users/" + oldData._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setName(data.data.name);
        setPwd(data.data.pwd);
      })
      .catch((err) => console.log(err));
  }, [oldData._id]);

  // edit  user
  const handleSubmit = (e) => {
    e.preventDefault();
    let updated = { name, pwd };
    console.log(oldData._id);
    axios.post("http://localhost:4000/api/users/edit/"+oldData._id, updated)
      .then((res) => {
        console.log(res.data);
        // setUnique(res.data.unique);
        // if (unique) console.log("Email created");
        // else console.log("Email already exists");
        history.push("/users");
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
          Edit User Information
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
                <PersonIcon className="icon" />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  defaultValue={oldData.name}
                  label="Username"
                  className="input-textfield"
                  onChange={(e) => setName(e.target.value)}
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
                <LockIcon className="icon" />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  defaultValue={oldData.pwd}
                  className="input-textfield"
                  label="Password"
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                />
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

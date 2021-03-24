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
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

export default function AddDialog(props) {
  // console.log(props);

  let { 
    open, setOpen, handleClose,
    reload, setReload
  } = props

  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // to show pwd
  const [showPwd, setShowPwd] = useState(false);
  const handleClickShowPassword = () => {
    setShowPwd(!showPwd);
  };

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


  // submit new user in admin mode
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { userName, email, pwd };
    // console.log(user)
    axios.post("http://localhost:4000/api/users", user)
      .then((res) => {
        console.log(res.data);
        setReload(!reload);
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
          Add User Information
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
                  label="Username"
                  className="input-textfield"
                  onChange={(e) => setuserName(e.target.value)}
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
            </Grid>

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
                  className="input-textfield"
                  label="Password"
                  type={showPwd ? 'text' : 'password'}
                  onChange={(e) => setPwd(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                    <IconButton
                      className='icon'
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                    >
                      {showPwd ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                  }}
                />
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

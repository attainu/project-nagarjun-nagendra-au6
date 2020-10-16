import React, { useState } from 'react';
import Header from '../components/header';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/action/user';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const Profile = (props) => {
  const classes = useStyles();
  const user = useSelector(state => state.userState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    userId: props?.user?.id,
    token: props?.user?.token,
    firstName: props?.user?.firstName,
    lastName: props?.user?.lastName,
    email: props?.user?.email,
    isSubmitting: false,
    removePhoto:false,
    photoURL: props?.user?.photoURL,
    file:null
  });
  const handleChange = (key, value) => {
    const newState = { ...state };
    newState[key] = value;
    setState(newState);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.photoURL && !state.firstName && !state.lastName) {
      return
    }
    const newState = { ...state };
    if(newState.removePhoto){
      newState.photoURL = null;
    }else{
      newState.photoURL = newState.file || newState.photoURL;
    }
    newState.isSubmitting = true;
    setState(newState);
    console.log(newState);
    await dispatch(updateUser(newState));
    newState.isSubmitting = false;
    newState.removePhoto = false;
    setState(newState);
    if (!user.error) {
      history.push('/profile');
    }
  }
  const removeImage = async (e) => {
    console.log(props.user);
    e.preventDefault();
    const newState = { ...state };
    newState.photoURL = null;
    newState.file = null;
    newState.removePhoto = true;
    setState(newState);
   // await dispatch(updateUser(state));
   // newState.isSubmitting = false;
   // if (!user.error) {
   //   history.push('/profile');
   // }
  }
  return props.user && (
    <div>
      <Header />
      <main className="backgrnd" style={{ marginLeft: "100px", textAlign: "center", marginTop: "50px " }} >
        <div style={{ marginBottom: "40px" }}>
          {state.file ? <img src={URL.createObjectURL(state.file)} style={{ borderRadius: "50%", width: "200px", height: "200px" }} alt={props.user.firstName} />
            : state.photoURL ? <img src={state.photoURL} style={{ borderRadius: "50%", width: "200px", height: "200px" }} alt={props.user.firstName} />
              : <span style={{ background: "gray", borderRadius: "50%", width: "50%", height: "50%", padding: "40px", color: "#000", fontSize: "50px", textTransform: "uppercase" }}>
                {props.user.firstName[0]}{props.user.lastName[0]}
              </span>
          }
        </div>

        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <form onSubmit={handleSubmit} noValidate>
            <Grid item xs={12}>
              <Tooltip title="Remove Photo">
                <IconButton color="secondary" aria-label="upload picture" component="span" disabled={state.isSubmitting}
                  onClick={removeImage}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <input accept="image/*"
                id="icon-button-file"
                type="file"
                className={classes.input}
                onChange={(e) => handleChange("file", e.target.files[0])} />
              <label htmlFor="icon-button-file">
                <Tooltip title="Upload Photo">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
              </label>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={state.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  error={!!state.firstNameError}
                  helperText={state.firstNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={state.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  error={!!state.lastNameError}
                  helperText={state.lastNameError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              disabled={state.isSubmitting}>
              Update Details
          </Button>
          </form>
        </Container>
        <h3>
          Name: {props.user.firstName + " " + props.user.lastName}
        </h3>
        <h3>
          Email: {props.user.email}
        </h3>
      </main>
      <Backdrop className={classes.backdrop} open={state.isSubmitting} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log("pro", state)
  return {
    user: state.userState.user,
    isAuth: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(Profile);
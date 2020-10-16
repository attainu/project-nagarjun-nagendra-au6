import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { registerUser } from '../redux/action/user';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Tooltip from '@material-ui/core/Tooltip';
import Ouricon from '../assets/images/ouricon.jpg';
import { connect } from 'react-redux';

class Register extends Component {
  state = {
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    isSubmitting: false,
    error: ''
  };

  handleChange = (key, value) => {
    const newState = { ...this.state };
    newState[key] = value;
    if (key === 'firstName') {
      newState.firstNameError = "";
      if (!newState.firstName.match(/^[a-z ,.'-]{3,150}$/i)) {
        newState.firstNameError = "firstName is not valid"
      }
      if (newState.firstName.trim() === "") {
        newState.firstNameError = "First name is required"
      }
    }
    if (key === 'lastName') {
      newState.lastNameError = "";
      if (!newState.lastName.match(/^[a-z ,.'-]{3,150}$/i)) {
        newState.lastNameError = "lastName is not valid"
      }
      if (newState.lastName.trim() === "") {
        newState.lastNameError = "Last name is required"
      }
    }
    if (key === 'email') {
      newState.emailError = "";
      if (!newState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        newState.emailError = "invalid email "
      }
      if (newState.email.trim() === "") {
        newState.emailError = "email is required"
      }
    }
    if (key === "password") {
      newState.passwordError = "";
      if (newState.password.length < 5) {
        newState.passwordError = "Can not be less than 5"
      }
      if (newState.password.trim() === "") {
        newState.passwordError = "password is required"
      }
    }
    this.setState(newState);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const newState = { ...this.state };
    if (newState.firstName.trim() === "" || newState.firstNameError) {
      newState.firstNameError = newState.firstNameError || "first name is required"
      this.setState(newState)
      return
    }
    if (newState.lastName.trim() === "" || newState.lastNameError) {
      newState.lastNameError = newState.lastNameError || "last name is required"
      this.setState(newState);
      return
    }
    if (newState.email.trim() === "" || newState.emailError) {
      newState.emailError = newState.emailError || "email is required"
      this.setState(newState);
      return
    }
    if (newState.password.trim() === "" || newState.passwordError) {
      newState.passwordError = newState.passwordError || "password is required"
      this.setState(newState);
      return
    }

    newState.isSubmitting = true;
    this.setState(newState);
    await this.props.registerUser(this.state);
    newState.error = this.props.user.error;
    newState.isSubmitting = false;
    this.setState(newState);
    if (!this.props.user.error) {
      this.props.history.push('/login');
    }

  }
  render() {
    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className="register-paper">
          <Typography component="h1" variant="h5">
            <img src={Ouricon} alt="user" style={{ width: "100%" }} />
          </Typography>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form onSubmit={this.handleSubmit} className="register-form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  onChange={(e) => this.handleChange("firstName", e.target.value)}
                  error={!!this.state.firstNameError}
                  helperText={this.state.firstNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={this.state.lastName}
                  onChange={(e) => this.handleChange("lastName", e.target.value)}
                  error={!!this.state.lastNameError}
                  helperText={this.state.lastNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange("email", e.target.value)}
                  error={!!this.state.emailError}
                  helperText={this.state.emailError}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange("password", e.target.value)}
                  error={!!this.state.passwordError}
                  helperText={this.state.passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField accept="image/*"
                  id="icon-button-file"
                  type="file"
                  className="register-input"
                  onChange={(e) => this.handleChange("photoURL", e.target.files[0])} />
                <label htmlFor="icon-button-file">
                  <Tooltip title="Upload Photo">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </Tooltip>
                </label>
              </Grid>
              {this.state.error &&
                <Grid item xs={12}>
                  <div className="error">{this.state.error}</div>
                </Grid>
              }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="register-submit"
              disabled={this.state.isSubmitting}
            >
              Sign Up
          </Button>
            <Grid container justify="center" className="mt-2">
              <Grid item>
                Already have an account?
              <Link href="/#/login" variant="body2">
                  Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userState
  }
}

export default connect(mapStateToProps, { registerUser })(Register);
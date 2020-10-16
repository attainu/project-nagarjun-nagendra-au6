import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/action/user';
import Ouricon from '../assets/images/ouricon.jpg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    padding: theme.spacing(3),
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const user = useSelector(state => state.userState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    isSubmitting: false
  });
  const handleChange = (key, value) => {
    setState({
      ...state,
      [key]: value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, isSubmitting: true });
    await dispatch(loginUser(state));
    setState({ ...state, isSubmitting: false });
    //console.log(user.error);
    if (!user.error) {
      history.push('/');
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          <img src={Ouricon} alt="user" style={{ width: "100%" }} />
        </Typography>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Grid item xs style={{ float: "right" }}>
            <Link href="/#/forgotPassword" variant="body2">
              Forgot password?
              </Link>
          </Grid>
          {user.error &&
            <Grid item xs={12} className="error">
              <div className="error">{user.error}</div>
            </Grid>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={state.isSubmitting}
          >
            Sign In
          </Button>
          <Grid container justify="center" className="mt-2">
            <Grid item >
              Don't have an account?
              <Link href="/#/register" variant="body2" className="mt-2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
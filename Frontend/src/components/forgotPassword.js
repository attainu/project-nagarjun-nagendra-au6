import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { forgotPassword } from '../redux/action/user';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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



const SignIn = (props) => {
    const classes = useStyles();
    //const user = useSelector(state => state.userState);
    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: "",
        isSubmitting: false
    });
    const handleChange = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }

    const reset = async (e) => {
        console.log('state',state)
        e.preventDefault();
        setState({ ...state, isSubmitting: true });
        await dispatch(forgotPassword(state));
        setState({ ...state, isSubmitting: false });
        console.log(props.useremail.error)
        if (!props.useremail.error) {
            history.push('/Resetpassword/'+state.email);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
        </Typography>
                <form className={classes.form} noValidate onSubmit={reset}>
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
                    <Grid>
                        <div className="error">
                            {props.useremail.error}
                        </div>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={state.isSubmitting}
                    >
                        Send Reset Link
          </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item >
                            Back to
              <Link href="/#/login" variant="body2" className="mt-2">
                                {" Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        useremail: state.userState
    }
}

export default connect(mapStateToProps, { forgotPassword })(SignIn);
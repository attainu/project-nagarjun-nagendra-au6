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
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { changePassword } from '../redux/action/user';
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

const Resetpassword = (props) => {
    const classes = useStyles();
   // const user = useSelector(state => state.userState);
    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        resetToken: "",
        password: "",
        isSubmitting: false,
        email: props.match.params.email
    });


    const handleChange = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }

    const reset = async (e) => {
        e.preventDefault();
        setState({ ...state, isSubmitting: true });

        await dispatch(changePassword(state));
        setState({ ...state, isSubmitting: false });
        if (!props.user.error) {
            history.push('/login');
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
                    Reset Password
        </Typography>
                <form className={classes.form} noValidate onSubmit={reset}>
                    <Grid>
                        <h2> {props.match.params.email}</h2>
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="resetToken"
                        label="resetToken"
                        type="resetToken"
                        id="resetToken"
                        autoComplete="resetToken"
                        value={state.resetToken}
                        onChange={(e) => handleChange("resetToken", e.target.value)}
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
                    <Grid>
                    <div className="error">
                            {props.user.error}
                        </div>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Change Password
          </Button>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item >
                            Back to
              <Link href="/" variant="body2" className="mt-2">
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
    console.log(state)
    return {
        user: state.userState
    }
}

export default connect(mapStateToProps, { changePassword })(Resetpassword);
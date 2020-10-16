import React, { Component } from 'react';
import Header from '../components/header';
import { connect } from 'react-redux';
import { allUser } from '../redux/action/user';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import userimage from '../assets/images/user.jpg';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { sendRequest, allRequest, updatetRequest } from '../redux/action/request';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

class Home extends Component {
    state = {
        users: null,
        snackbarOpen: false,
        snackbarMessage: "",
        snackbarSeverity: "success"
    }
    async componentDidMount() {
        if (this.props.userState.user) {
            if (!this.props.userState.users) {
                await this.props.allUser();
            }
            await this.props.allRequest();
            this.setState({
                users: this.props.userState.users,
            })
            //console.log(this.props.request.requests)
            await this.props.updatetRequest();
            console.log(this.props, "user")
        }
    }

    connect = async (receiver) => {
        await this.props.sendRequest({
            receiver: receiver,
            sender: this.props.userState.user.id
        });
        // console.log('message',this.props.request.error);
        if (this.props.request.error) {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: this.props.request.error,
                snackbarSeverity: 'error'
            })
        } else {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: this.props.request.request.message
            })

        }
    }
    acceptGroupRequest = async (id, groupId) => {
        await this.props.updatetRequest({
            isAccepted: true,
            id,
            groupId
        });
        this.setState({
            snackbarOpen: true,
            snackbarMessage: "Accept request successfully"
        });
        await this.props.allRequest();
    }
    Accept = async (id, friend) => {
        await this.props.updatetRequest({
            isAccepted: true,
            id,
            friend
        });
        this.setState({
            snackbarOpen: true,
            snackbarMessage: "Accept request successfully"
        });
        await this.props.allRequest();

    }
    Reject = async (id) => {
        await this.props.updatetRequest({
            isReject: true,
            id
        });
        this.setState({
            snackbarOpen: true,
            snackbarMessage: "Reject request successfully",
            snackbarSeverity: 'error'
        })
        await this.props.allRequest();

    }



    showSnackbar = () => {
        return <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.snackbarOpen}
            onClose={() => { this.setState({ snackbarOpen: false }) }}
            autoHideDuration={3000}
        >
            <MuiAlert severity={this.state.snackbarSeverity} variant="filled">
                {this.state.snackbarMessage}
            </MuiAlert>
        </Snackbar>
    }
    render() {

        return (
            <div className="backgrnd-home" style={{ marginLeft: "100px" }}>
                <Header />
                {this.state.users ?
                    <div className="row">
                        <Grid container >
                            <Grid container item spacing={3} xs={12} sm={12} md={8}>
                                {this.state.users && this.state.users.map((item) => (
                                    <Grid item xs={12} sm={4} key={item._id}>
                                        <Card style={{ maxWidth: "200px" }} className="col-2">
                                            <CardMedia
                                                className="user-image"
                                                component="img"
                                                image={item.photoURL || userimage}
                                                title="user image"
                                            />
                                            <CardActions style={{ justifyContent: 'center', flexDirection: 'column' }}>
                                                <Typography style={{ fontWeight: "bold" }}>
                                                    {item.firstName + " " + item.lastName}
                                                </Typography>
                                                <Button variant="outlined" color="primary" onClick={() => this.connect(item._id)}>Add Friend</Button>
                                            </CardActions>

                                        </Card>
                                    </Grid>
                                ))}

                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Paper style={{ padding: '1rem' }}>
                                    <div style={{ textAlign: "center" }} >
                                        <h3>Requests</h3>
                                        {this.props.request.requests.length > 0 ?
                                            <div>
                                                {
                                                    this.props.request.requests && this.props.request.requests.map((item) => (
                                                        <Paper key={item._id} style={{ margin: "10px", padding: "0 10px" }} >
                                                            {item.sender &&
                                                                <Grid container spacing={1} justify="space-between" alignItems="center">
                                                                    <Grid item >
                                                                        <img alt="user" src={item.sender.photoURL || userimage} style={{ width: "40px", height: "40px", borderRadius: "50px" }} />
                                                                    </Grid>
                                                                    <Grid item >
                                                                        {item.sender.firstName + " " + item.sender.lastName}
                                                                    </Grid>

                                                                    <Grid item >
                                                                        {/* <IconButton aria-label="delete" color="primary" onClick={() => this.Accept(item._id, item.sender._id)}>
                                                                            <CheckIcon />
                                                                        </IconButton> */}
                                                                        <Button size="small" color="primary" className="request-btn" variant="contained" onClick={() => this.Accept(item._id, item.sender._id)}>
                                                                            Accept
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item >
                                                                        {/* <IconButton aria-label="delete" color="secondary" onClick={() => this.Reject(item._id)}>
                                                                            <ClearIcon />
                                                                        </IconButton> */}
                                                                        <Button size="small" className="request-btn" color="secondary" variant="contained" onClick={() => this.Reject(item._id)}>
                                                                            Reject
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                            {item.groupId &&
                                                                <Grid container spacing={1} justify="space-between" alignItems="center">

                                                                    <Grid item >
                                                                        <img alt="user" src={item.groupId.photoURL || userimage} style={{ width: "40px", height: "40px", borderRadius: "50px" }} />
                                                                    </Grid>
                                                                    <Grid item >
                                                                        {item.groupId.groupName}
                                                                    </Grid>
                                                                    <Grid item >
                                                                        {/* <IconButton aria-label="delete" color="primary" onClick={() => this.acceptGroupRequest(item._id, item.groupId._id)}>
                                                                            <CheckIcon />
                                                                        </IconButton> */}
                                                                        <Button size="small" color="primary" variant="contained" onClick={() => this.acceptGroupRequest(item._id, item.groupId._id)}>
                                                                            Accept
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item >
                                                                        {/* <IconButton aria-label="delete" color="secondary" onClick={() => this.Reject(item._id)}>
                                                                            <ClearIcon />
                                                                        </IconButton> */}
                                                                        <Button size="small" color="secondary" variant="contained" onClick={() => this.Reject(item._id)}>
                                                                            Reject
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            }
                                                        </Paper>
                                                    ))
                                                }
                                            </div>
                                            : <div>
                                                No request
                                        </div>
                                        }
                                    </div>

                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    : <div className="loader">
                        <CircularProgress />
                    </div>
                }
                {this.showSnackbar()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userState: state.userState,
        request: state.requestReducer
    }
}

export default connect(mapStateToProps, { allUser, sendRequest, allRequest, updatetRequest })(Home);
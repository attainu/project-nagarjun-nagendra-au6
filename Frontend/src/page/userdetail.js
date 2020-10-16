import React, { Component } from 'react';
import Header from '../components/header';
import { allUser, singleUser } from '../redux/action/user';
import { sendRequest } from '../redux/action/request';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import userimage from '../assets/images/user.jpg';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';

class Details extends Component {
    state = {
        user: null,
        snackbarOpen: false,
        snackbarMessage: "",
        snackbarSeverity: "success"
    }

    connect = async (receiver) => {
        await this.props.sendRequest({
            receiver: receiver,
            sender: this.props.userState.user.id
        });
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
    async componentDidMount() {
        //await this.props.allUser();
        await this.props.singleUser(this.props.match.params.id);
        //console.log(this.props.userState.oneuser)
        await this.setState({ user: this.props.userState.oneuser });
        // if (this.props.userState.oneuser.group && this.props.userState.oneuser.group.length > 0){
        //     const groups=[];
        //     this.props.userState.oneuser.group.forEach((groupId)=>{
        //       const groupData = this.props.userState.users.
        //     })
        // }
    }
    render() {
        return (
            <div style={{ marginLeft: "100px" }}>
                <Header />
                {this.state.user ?
                    <Grid container>
                        <Grid item xs={12} sm={12} md={4}>
                            <img height="300px" width="300px" alt="user" src={this.state.user.photoURL || userimage} />
                            <h1>Name: {this.state.user.firstName + " " + this.state.user.lastName}</h1>
                            <h2>Email: {this.state.user.email}</h2>
                            <h3>Join date : {new Date(this.state.user.createdAt).toLocaleDateString()}</h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <Tooltip title="send Request" aria-label="add">
                                <Button variant="contained" color="primary" size="large" style={{ marginLeft: "60px" }} onClick={() => this.connect(this.state.user._id)}>connect</Button>
                            </Tooltip>
                            <h1>Friends</h1>
                            {this.state.user?.friends.map((fr) => (
                                <div key={fr._id}>
                                    {/* <h3>{fr.firstName} {fr.lastName}</h3> */}
                                    <Card className="friend">
                                        <CardHeader
                                            avatar={
                                                <Avatar alt="user" src={fr.photoURL || userimage} />
                                            }
                                            title={fr.firstName + " " + fr.lastName}
                                        />
                                    </Card>
                                </div>
                            ))}
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <div >
                                <h3>last login date: {new Date(this.state.user.updatedAt).toLocaleDateString()}</h3>
                            </div>
                            <h1>Groups</h1>
                            {this.state.user?.group.map((fr) => (
                                <div key={fr._id}>
                                    {/* <h3>{fr.firstName} {fr.lastName}</h3> */}
                                    <Card className="friend">
                                        <CardHeader
                                            avatar={
                                                <Avatar alt="user" src={fr.photoURL || userimage} />
                                            }
                                            title={fr.groupName}
                                        />
                                    </Card>
                                </div>
                            ))}
                        </Grid>
                    </Grid>
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
export default connect(mapStateToProps, { allUser, sendRequest, singleUser })(Details);
import React, { Component } from 'react';
import Header from '../components/header';
import { allFriends } from '../redux/action/request';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import userimage from '../assets/images/user.jpg';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, Fab } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';
import * as io from 'socket.io-client';
import IconButton from '@material-ui/core/IconButton';
import { singleChat } from '../redux/action/chat';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Portal from '@material-ui/core/Portal';
import Picker from 'emoji-picker-react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

class Friends extends Component {
    state = {
        friends: null,
        selectFriend: null,
        message: "",
        messages: [],
        user: this.props.user.user,
        loading: false,
        openemoji: false,
        chosenEmoji: null
    }
    messageRef = React.createRef();
    socket = null;
    async componentDidMount() {
        await this.props.allFriends();
        // console.log(this.props)
        await this.setState({ friends: this.props.friend.friends.friends });
        //  console.log(this.state.friends);
        this.socket = io("/");
        this.socket.emit('user-join', this.props.user.user.id);
        this.socket.on('user-join', async (data) => {
            const friends = [...this.state.friends];
            for (let friend of friends) {
                friend.unread = 0;
                if (friend._id === data.userId) {
                    friend.socketId = data.socketId
                }
            }
            await this.setState({ friends });
        });
        this.socket.on('one-2-one', (data) => {
            if ((data.sender === this.state.user.id) || (this.state.selectFriend && this.state.selectFriend._id === data.sender)) {
                const messages = [...this.state.messages];
                messages.push(data);
                this.setState({ messages });
            } else {
                const friends = [...this.state.friends];
                for (let friend of friends) {
                    if (friend._id === data.sender) {
                        friend.unread = friend.unread ? friend.unread + 1 : 1;
                    }
                }
                this.setState({ friends });

            }
            this.scrollToBottom();
        });
    }

    sendMessage = async (e) => {
        e.preventDefault();
        const message = {
            name: this.state.user.firstName + " " + this.state.user.lastName,
            photoURL: this.state.user.photoURL || null,
            sender: this.state.user.id,
            message: this.state.message,
            socketId: this.state.selectFriend.socketId,
            receiver: this.state.selectFriend._id
        }
        //console.log(this.socket.id);
        //console.log(message);
        if (this.state.message) {
            this.socket.emit('one-2-one', message);
            this.setState({
                ...this.state,
                message: ''
            })
        }

    }



    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
        console.log(files)
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    // hanleSearchChange = (e) => {
    //     this.setState({
    //         chatMessage: e.target.value
    //     })
    // }
    renderCards = () => {
        console.log("inside renderrrr", this.props.chats)
        this.props.chats.chats
            && this.props.chats.chats.chats.map((chat) => (
                {/*<ChatCard  key={chat._id}  {...chat} />*/ }
            ));
    }
    handleFrndChat = async (item) => {
        //console.log(item)
        item.unread = 0;
        await this.setState({
            selectFriend: item
        });
        this.setState({
            loading: true
        });
        await this.props.singleChat(item._id);
        //console.log(this.props.chats.singleMessages)
        await this.setState({
            messages: this.props.chats.singleMessages
        })
        await this.setState({
            loading: false
        });
        this.scrollToBottom();
    }

    onChangeHandler = (event) => {
        console.log(event.target.files[0]);
        const message = {
            name: this.state.user.firstName + " " + this.state.user.lastName,
            photoURL: this.state.user.photoURL || null,
            sender: this.state.user.id,
            file: event.target.files[0],
            fileName: event.target.files[0].name,
            type: event.target.files[0].type,
            socketId: this.state.selectFriend.socketId,
            receiver: this.state.selectFriend._id
        }
        this.socket.emit('single-fileupload', message);
    }

    handleClickEmoji = () => {
        this.setState({
            openemoji: true
        })
    };

    handleClickAwayEmoji = () => {
        this.setState({
            openemoji: false
        })
        // setOpenEmoji(false);
    };

    onEmojiClick = async (event, emojiObject) => {
        // this.setState(emojiObject);
        //console.log(emojiObject.emoji)
        await this.setState({
            ...this.state, message: this.state.message + emojiObject.emoji
        })
        this.setState({
            chosenEmoji: false
        })
    };

    scrollToBottom = () => {
        this.messageRef.current && this.messageRef.current.scrollIntoView();
    }
    render() {
        return (
            <div className="backgrnd" style={{ marginLeft: "100px" }}>
                <Header />
                {this.state.friends ?
                    <Grid container >
                        <Grid item sm={3} >
                            <div className="friend-list">
                                <Grid container direction="column" alignItems="flex-start">
                                    {this.state.friends && this.state.friends.map((item) => (
                                        <Grid item key={item._id} style={{ margin: '10px 0' }}>
                                            <Card className="backgrnd" onClick={() => this.handleFrndChat(item)} style={this.state.selectFriend && this.state.selectFriend._id === item._id ? { backgroundColor: '#bbb' } : { cursor: 'pointer' }}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar alt="user" src={item.photoURL || userimage} />
                                                    }
                                                    title={item.firstName + " " + item.lastName}
                                                    action={
                                                        <span className='unread'>
                                                            {item.unread > 0 && item.unread}
                                                        </span>
                                                    }
                                                    subheader={
                                                        <div>
                                                            Last seen:{new Date(item.updatedAt).toLocaleTimeString()}
                                                        </div>
                                                    }
                                                />
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item sm={9}>
                            <div>
                                {!this.state.selectFriend ?
                                    <div>
                                        {this.state.friends.length === 0 ?
                                            <h1>You don't have any friend.</h1>
                                           : <h1>Click on any friend to start conversation.</h1>
                                        }
                                    </div>
                                    :
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <AppBar position="relative" style={{ background: "#37474f" }}>
                                            <Toolbar>
                                                <Typography variant="h6" className="title" noWrap>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar alt="user" src={this.state.selectFriend.photoURL || userimage} />
                                                        }
                                                        title={this.state.selectFriend.firstName + ' ' + this.state.selectFriend.lastName}
                                                        subheader={
                                                            <div className="time">Last seen:{new Date(this.state.selectFriend.updatedAt).toLocaleTimeString() + ' ' + new Date(this.state.selectFriend.updatedAt).toLocaleDateString()}
                                                            </div>
                                                        }
                                                    />
                                                </Typography>
                                                <Tooltip title="Share documents" aria-label="add">
                                                    <Fab size="small" style={{ marginRight: "8px" }}>
                                                        <input accept="image/*,video/*,application/pdf" className='input' id="icon-button-file" type="file" onChange={this.onChangeHandler} />
                                                        <label htmlFor="icon-button-file" >
                                                            <IconButton type="file" aria-label="upload picture" component="span">
                                                                <AttachmentIcon />
                                                            </IconButton>
                                                        </label>
                                                    </Fab>
                                                </Tooltip>
                                            </Toolbar>
                                        </AppBar>
                                        <div className="chat-box">
                                            <Grid className="messages">
                                                {this.state.loading && <div className="loader"><CircularProgress /></div>}
                                                {this.state.messages.map(item => (
                                                    <Grid item xs={12} key={item._id} style={{ padding: '8px' }} ref={this.messageRef}>
                                                        <div className="message">
                                                            <Avatar className="message-photo" src={item.photoURL || userimage} alt="message" />
                                                            <div className="message-name">{item.name}</div>
                                                        </div>
                                                        {item.file ?
                                                            <>
                                                                {item?.type.indexOf('video') !== -1 ?
                                                                    <video width="320" height="240" controls autoPlay>
                                                                        <source src={`/uploads/${item.file}`} type={item.type} />
                                                                    </video>
                                                                    :
                                                                    item?.type.indexOf('pdf') !== -1 || item?.type.indexOf('text') !== -1 ?
                                                                        <div className="message-content">
                                                                            <a className="send-link" target="_blank" rel="noopener noreferrer" href={"/uploads/" + item.file}>{item.fileName || 'open pdf'}</a>
                                                                        </div>
                                                                        :
                                                                        <img className="message-file" src={`/uploads/${item.file}`} alt={item.file} />
                                                                }
                                                            </>
                                                            :
                                                            <div className="message-content">{item.message}</div>
                                                        }
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <form className="message-form" onSubmit={this.sendMessage}>
                                                <Grid container>
                                                    <Grid item xs={1} sm={1}>
                                                        <div>
                                                            <ClickAwayListener onClickAway={this.handleClickAwayEmoji}>
                                                                <div>
                                                                    <InsertEmoticonIcon onClick={this.handleClickEmoji} style={{ cursor: "pointer" }} />
                                                                    {this.state.openemoji ? (
                                                                        <Portal>
                                                                            <div className="emoji-class">
                                                                                <Picker onEmojiClick={this.onEmojiClick} />
                                                                            </div>
                                                                        </Portal>
                                                                    ) : null}
                                                                </div>
                                                            </ClickAwayListener>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={9} sm={10}>
                                                        <TextField
                                                            fullWidth
                                                            name="message"
                                                            variant="outlined"
                                                            autoComplete="off"
                                                            size="small"
                                                            value={this.state.message}
                                                            onChange={(e) => this.setState({ message: e.target.value })}
                                                        />
                                                    </Grid >
                                                    <Grid item xs={2} sm={1}>
                                                        <Fab style={{
                                                            width: "40px",
                                                            height: "40px"
                                                        }} type="submit"><SendIcon /></Fab>
                                                    </Grid>
                                                </Grid>
                                            </form>

                                        </div>

                                    </div>

                                }
                            </div>

                        </Grid>
                    </Grid>
                    : <div className='loader'>
                        <CircularProgress />
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    //console.log("state11", state)
    //console.log("chat", state.singleChatReducer)
    return {
        friend: state.requestReducer,
        user: state.userState,
        chats: state.chatReducer
    }
}


export default connect(mapStateToProps, { allFriends, singleChat })(Friends);
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { logout } from '../redux/action/user';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Ouricon from '../assets/images/ouricon.jpg';
import { searchUser } from '../redux/action/group';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import userimage from '../assets/images/user.jpg';
import { Card, Avatar, CardHeader } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: "70px"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menuLogo: {
        display: 'flex',
        alignItems: 'center'
    },
    user: {
        textTransform: 'uppercase',
        background: '#fff',
        color: '#000',
        borderRadius: '50%',
        width: '38px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.3rem'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '500px'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    rootclick: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 1,
        padding:'8px',
        border: '1px solid',
        // padding: theme.spacing(1),
        backgroundColor: "#3f51b5",
        color: "black",
        borderBottomLeftRadius:"8px",
        borderBottomRightRadius:"8px"
    },

}));

function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [openClick, setopenClick] = React.useState(false);
    // const [searchResults, setSearchResults] = React.useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = useState({
        searchQuery: '',
        searchQueryResult: null,
        users: null
    })
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickAway = () => {
        setopenClick(false);
        setState({
            ...state, searchQuery: ''
        })
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutUser = async () => {
        await props.logout();
        history.push("/login");
    }
    const handleChangeSearch = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }
    // const handleSearchChange = event => {
    //     setSearchTerm(event.target.value);
    //     const results = props.userState.users.filter(person =>
    //         person.firstName.toLowerCase().indexOf(searchTerm) !== -1
    //     );
    //     setSearchResults(results);
    // };

    useEffect(() => {
        if (!props.userState.isAuthenticated) {
            history.push('/login');
        }
    }, [props, history]);

    // React.useEffect(() => {
    //     const results = props.userState.users.filter(person =>
    //         person.toLowerCase().includes(searchTerm)
    //     );
    //     setSearchResults(results);
    // }, [searchTerm]);


    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        setopenClick((prev) => !prev);
        await props.searchUser({
            searchQuery: state.searchQuery
        });
        //console.log("props", props.group.searchQuery);
        setState({ ...state, searchQueryResult: props.group.searchQuery });

    };

    const userDetailPage = async (id) => {
        //console.log(id)
        history.push(`/user/${id}`)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div className={classes.menuLogo}>
                        <Typography variant="h6" noWrap style={{ width: "50px", height: "50px", borderRadius: "50%" }}>
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <img src={Ouricon} alt="user" style={{ width: "100%", cursor: "pointer" }} />
                            </Link>
                        </Typography>
                        <form className={classes.search} style={{ marginLeft: "100px" }} onSubmit={handleSubmitSearch}>
                            <div className={classes.searchIcon} >
                                <SearchIcon type="submit" />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={state.searchQuery}
                                // value={searchTerm}
                                // onChange={handleSearchChange}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => handleChangeSearch("searchQuery", e.target.value)}
                            />
                            {/* <ul>
                                {searchResults.map(item => (
                                    <li key={item._id}>{item.firstName}</li>
                                ))}
                            </ul> */}
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <div className={classes.rootclick}>
                                    <div>
                                        {
                                            openClick ? (
                                                <div className={classes.dropdown} >
                                                    <Grid style={{ margin: '10px 0' }} container direction="column" >
                                                        {state.searchQueryResult && state.searchQueryResult.map((item) => (
                                                            <Grid item key={item._id} onClick={() => userDetailPage(item._id)}>
                                                                {/* <div style={{ color: "white" }}>
                                                                    We have this user.
                                                                </div> */}
                                                                <Tooltip title="click for seen user Details" aria-label="add">
                                                                    <Card style={{ cursor: "pointer" }}>
                                                                        <CardHeader
                                                                            avatar={
                                                                                <Avatar alt="user" src={item.photoURL || userimage} />
                                                                            }
                                                                            title={item.firstName + " " + item.lastName}
                                                                        />
                                                                    </Card>
                                                                </Tooltip>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </div>
                                            ) : null}
                                    </div>
                                </div>

                            </ClickAwayListener>

                        </form>
                    </div>
                    {props.user &&
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                            >
                                <div>

                                </div>
                                {props.user.photoURL ? <img src={props.user.photoURL} alt={props.user.firstName} className={classes.user} />
                                    : <span className={classes.user} style={{ padding: 4 }}>
                                        {props.user.firstName[0]}{props.user.lastName[0]}
                                    </span>
                                }
                            </IconButton>

                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}><Link to="/profile" style={{ color: "black", textDecoration: "none" }}>Profile</Link></MenuItem>

                                <MenuItem onClick={logoutUser}>Logout</MenuItem>
                            </Menu>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <ListItemIcon style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px' }}>
                                <HomeIcon />
                                <Typography variant="body2">Home</Typography>
                            </ListItemIcon>
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="/friend" style={{ textDecoration: "none" }}>
                            <ListItemIcon style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px' }}>
                                <PersonIcon />
                                <Typography variant="body2">Friend</Typography>
                            </ListItemIcon>
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="/group" style={{ textDecoration: "none" }}>
                            <ListItemIcon style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px' }}>
                                <PeopleAltIcon />
                                <Typography variant="body2">Group</Typography>
                            </ListItemIcon>
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />

            </main>
        </div >
    );
}

const mapStateToProps = (state) => {
    //console.log(state.userState)
    return {
        user: state.userState.user,
        isAuth: state.isAuthenticated,
        group: state.groupReducer,
        userState: state.userState,
    }
}
export default connect(mapStateToProps, { logout, searchUser })(MiniDrawer);
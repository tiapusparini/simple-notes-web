import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Link, 
  Container,
  Icon,
  Tooltip,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  TextSnippetIcon,
} from "@material-ui/icons";
// import TextSnippetRoundedIcon from '@material-ui/icons-material/TextSnippetRounded';
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography, Button } from "../Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";
import {getPenggunaById} from "../../functions/Pengguna";

const messages = [
  {
    id: 0,
    variant: "warning",
    name: "Jane Hew",
    message: "Hey! How is it going?",
    time: "9:32",
  },
  {
    id: 1,
    variant: "success",
    name: "Lloyd Brown",
    message: "Check out my new Dashboard",
    time: "9:18",
  },
  {
    id: 2,
    variant: "primary",
    name: "Mark Winstein",
    message: "I want rearrange the appointment",
    time: "9:15",
  },
  {
    id: 3,
    variant: "secondary",
    name: "Liana Dutti",
    message: "Good news from sale department",
    time: "9:09",
  },
];

const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  {
    id: 1,
    color: "success",
    type: "info",
    message: "What is the best way to get ...",
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "12 new orders has arrived today",
  },
];

export default function Header(props) {
  var classes = useStyles();
  const history = useHistory();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nama, setNama] = useState(true);

  useEffect(() => {
    async function getData() {
      const data = await getPenggunaById(localStorage.id);
      setNama(data.nama);
      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Container>
        <Toolbar className={classes.toolbar}>
          {/* <TextSnippetIcon classes={{ root: classes.headerIcon }} /> */}
          <Typography variant="h4" weight="medium" className={classes.logotype}>
            Simple Notes
          </Typography>
          <div className={classes.grow} />
          <Tooltip title="Profile" placement="bottom">
            <IconButton
              aria-haspopup="true"
              color="#ffffff"
              className={classes.headerMenuButton}
              aria-controls="profile-menu"
              onClick={(e) => setProfileMenu(e.currentTarget)}
            >
              <AccountIcon classes={{ root: classes.headerIcon }} />
            </IconButton>
          </Tooltip>
          <Menu
            id="profile-menu"
            open={Boolean(profileMenu)}
            anchorEl={profileMenu}
            onClose={() => setProfileMenu(null)}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
          >
            <div className={classes.profileMenuUser}>
              <Typography variant="h6" weight="medium">
                Hi {nama}! 
              </Typography>
            </div>
            <div className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
                onClick={() => signOut(userDispatch, props.history)}
              >
                Sign Out
              </Typography>
            </div>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Box,
} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, signUpUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [errorRegist, setErrorRegist] = useState(false);
  var [errorLogin, setErrorLogin] = useState(false);

  var [activeTabId, setActiveTabId] = useState(0);
  var [namaValue, setNamaValue] = useState("");
  var [usernameValue, setUsernameValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [loginPassValue, setLoginPassValue] = useState("");

  const errorConfigLogin = (condition) => {
    if(condition == true){
      return setErrorLogin(true);
    }
    else{
      return setErrorLogin(false);
    }
  };

  const errorConfigRegist = (condition) => {
    if(condition == true){
      return setErrorRegist(true);
    }
    else{
      return setErrorRegist(false);
    }
  };

  return (
    <Grid container className={classes.container}>

      <div className={classes.logotypeContainer}>
        {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
        <Typography className={classes.logotypeText}>Simple Notes</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="Register" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Fade in={errorLogin}>
                <div>
                <Alert severity="warning">
                  Something is wrong with your login or password :(
                </Alert>
                </div>
              </Fade>
              <TextField
                autoFocus
                id="username"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                margin="normal"
                label="Username"
                type="username"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginPassValue}
                onChange={(e) => setLoginPassValue(e.target.value)}
                margin="normal"
                label="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || loginPassValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        loginPassValue,
                        props.history,
                        setIsLoading,
                        errorConfigLogin,
                      ) 
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                {/* <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Register
                </Button> */}
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              {/* <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography> */}
              <Fade in={errorRegist}>
                <Alert severity="warning">
                  Data exist, please input another username :(
                </Alert>
              </Fade>
              <TextField
                autoFocus
                id="name"
                label="Full Name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={namaValue}
                onChange={(e) => setNamaValue(e.target.value)}
                margin="normal"
                type="text"
                fullWidth
              />
              <TextField
                id="username"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
                margin="normal"
                label="Username"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                margin="normal"
                label="Password"
                type="password"
                // helperText="at least 8 character"
                FormHelperTextProps={{
                  className: classes.helperText
                }}
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={() =>
                      signUpUser(
                        userDispatch,
                        namaValue,
                        usernameValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        errorConfigRegist,
                      )
                    }
                    disabled={
                      namaValue.length === 0 ||
                      usernameValue.length === 0 ||
                      passwordValue.length === 0 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              {/* <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
            </React.Fragment>
          )}
        </div>
        {/* <Typography color="primary" className={classes.copyright}>
          © 2014-{new Date().getFullYear()}{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://flatlogic.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Flatlogic
          </a>
          , LLC. All rights reserved.
        </Typography> */}
      </div>
    </Grid>
  );
}

export default withRouter(Login);

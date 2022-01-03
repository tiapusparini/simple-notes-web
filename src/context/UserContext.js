import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    case "SIGNUP_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "SIGNUP_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, signUpUser };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, errorConfigLogin) {
    // errorConfigLogin(false);
    // errorConfigLogin(false);
    setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", login);
    urlencoded.append("password", password);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://tia-notes-api.herokuapp.com/auth/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.data === null){
          errorConfigLogin(true);
          setIsLoading(false);
        }else{
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("id", result.data.id);
          errorConfigLogin(false);
          setIsLoading(false);
          dispatch({ type: "LOGIN_SUCCESS" });

          history.push("/app/note");
        }
      })
      .catch(error => {
        dispatch({ type: "LOGIN_FAILURE" });
        errorConfigLogin(true);
        setIsLoading(false);
      });
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

function signUpUser(dispatch, nama, username, password, history, setIsLoading, errorConfigRegist){
  setIsLoading(true);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("nama", nama);
  urlencoded.append("username", username);
  urlencoded.append("password", password);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("https://tia-notes-api.herokuapp.com/auth/register", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.data === null){
        errorConfigRegist(true);
        setIsLoading(false);
      }else{
        dispatch({ type: "SIGNUP_SUCCESS" });
        errorConfigRegist(false);
        setIsLoading(false);

        history.push("/login");
      }
    })
    .catch(error => {
      dispatch({ type: "SIGNUP_FAILURE" });
      errorConfigRegist(true);
      setIsLoading(false);
    });
}
import React from 'react';

// Default user object
const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

// Default logOut function
const defaultLogOut = () => {};

// Create the context
const AppContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export { defaultUser, defaultLogOut, AppContext };

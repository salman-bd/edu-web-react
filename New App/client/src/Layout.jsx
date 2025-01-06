import React, { useEffect, useState } from 'react';  
import Header from './components/Header/Header';  
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom'; 

import {  UserContextProvider} from './context/userContext';

function Layout() {
  const [loginText, setLoginText] = useState("");  
  const [signupText, setSignupText] = useState("");

  const [regFormHeadline, setRegFormHeadline] = useState("");
  // const [loginStatus, setLoginStatus] = useState(false);
  // const [signupStatus, setSignupStatus] = useState(false);

  
 

  const value = {  
    loginText, 
    setLoginText,
    signupText, 
    setSignupText,

    regFormHeadline,
    setRegFormHeadline,
    // loginStatus,
    // setLoginStatus,
    // signupStatus,
    // setSignupStatus,

  };  

    return (
      <UserContextProvider value={value}>
      <Header/>
      <Outlet />
      <Footer />
      </UserContextProvider>
    )
  }
  
  export default Layout
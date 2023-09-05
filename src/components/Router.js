//import React from "react";
import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // eslint-disable-line no-unused-vars

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />  
          </> 
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
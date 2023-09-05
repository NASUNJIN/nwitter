//import React from "react";
import React, {useState} from "react";
import Router from "components/Router";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser);
  // usState에서 유저의 로그인 여부를 확인 할 수 있음
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); // eslint-disable-line no-unused-vars
  return (
    <>
      <Router isLoggedIn={ isLoggedIn } />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
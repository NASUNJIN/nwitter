//import React from "react";
import React, {useEffect, useState} from "react";
import Router from "components/Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  // usState에서 유저의 로그인 여부를 확인 할 수 있음
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // eslint-disable-line no-unused-vars
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        const uid = user.uid
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }); 

  return (
    <>
      {init ? <Router isLoggedIn={ isLoggedIn } /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
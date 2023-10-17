//import React from "react";
import React, {useEffect, useState} from "react";
import Router from "components/Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  // usState에서 유저의 로그인 여부를 확인 할 수 있음
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // eslint-disable-line no-unused-vars
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    // 로그인 되면 호출
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []); 

  return (
    <>
      {init ? (<Router isLoggedIn={ isLoggedIn } userObj={ userObj } />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
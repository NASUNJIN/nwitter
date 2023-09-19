import React, { useState } from "react";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);  //false : Log In, true : Create newAccount
    const [error, setError] = useState("");

    // const onChange = (event) => {
    //     const {target: {name, value}} = event;
    //     if(name === "email"){
    //         setEmail(value);
    //     } else if(name ==="password") {
    //         setPassword(value);
    //     }
    // };  onChange={e => setEmail(e.target.value)} 로 사용 가능

    const onSubmit = async (event) => {
        event.preventDefault();  // 폼 제출 시 페이지 새로고침 방지
        // 만약 없을 시 로그인하면 링크에 이메일이랑 비번 친게 보임
        // 리엑트 코드 및 state 초기화
        try {
            let data;
            const auth = getAuth();
            if (newAccount) {
                // create account
                const data = await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    console.log(userCredential.user)
                });
            } else {
                // Login In
                const data = await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    console.log(userCredential.user)
                });
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    // onChange={onChange}
                    onChange={event => setEmail(event.target.value)}
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password}
                    //onChange={onChange}
                    onChange={event => setPassword(event.target.value)}
                />
                <input 
                    type="submit"
                    value={newAccount ? "Create Account" : "Sign In"}
                />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
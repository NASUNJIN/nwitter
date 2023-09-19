import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { authService } from "fbase";


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

    // '(prev) => !prev' 이전 상태 값을 가져와서 !prev로 계산하여 현재 상태 값을 반전
    // newAccount가 true라면 !prev는 false, newAccount가 false라면 !prev는 true
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
            target:{ name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        const auth = getAuth();
        const data = await signInWithPopup(auth, provider)
        console.log(data);
    };

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
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
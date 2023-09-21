import { authService } from "fbase";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const onLogOutClick = () => {
        signOut(auth);
        // {replace:true} : 현재 경로를 새로운 경로로 교체하고, 이전 경로로 돌아 갈 수 없게 함.
        // ex) 로그아웃 후 다시 뒤로가기 눌러서 프로필 페이지로 못 돌아감.
        navigate("/", {replace:true});
    };
    return (
        <button onClick={onLogOutClick}>Log Out</button>
    )
};

export default Profile;
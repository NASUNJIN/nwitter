import React from "react";
import { Link, useNavigate } from "react-router-dom";

// const Profile = () => {
//     const navigate = useNavigate();
//     const auth = getAuth();
//     const onLogOutClick =() => {
//         signOut(auth);
//         navigate
//     }
// }

const Navigation = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">My Profile</Link>
            </li>
        </ul>
    </nav>
);

// import React from "react";

// const Navigation = () => <nav>lalala</nav>;
export default Navigation;
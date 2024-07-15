import {setToken} from "./Auth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {API_DOMAIN} from "../consts";
import "./login.css";

export default function Hello() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //check to see if the fields are not empty
    const handleLogin = async (event) => {
        event.preventDefault();

        if ((username === "") || (password === "")) {
            alert("Username and password should not be empty!");
        } else {
            console.log(username);
            console.log(password);

            const url = `${API_DOMAIN}/api/login/token`;
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const urlencoded = new URLSearchParams();
            urlencoded.append('username', username);
            urlencoded.append('password', password);
            try {
                const resp = await fetch(url, {
                    method: 'POST',
                    body: urlencoded,
                });
                if (resp.status === 201) {
                    const result = await resp.json();
                    setToken(result["access_token"]);
                    // setIsLoggedIn(true);
                    console.log(result)
                    navigate('/my_tasks', {replace: true});
                } else {
                    if (resp.status === 404) {
                        alert("User Not Found!");
                    } else if (resp.status === 401) {
                        alert("Incorrect Username or password!");
                    }
                    setUsername("");
                    setPassword("");
                }
            } catch (error) {
                console.error(error);
            }
        }

    };

    return (
        <div className="login-container">
            <h1>Welcome</h1>
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <label style={{marginRight: 10}}>Input Username</label>
                    <input
                        type="text"
                        className="username-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label style={{marginRight: 10}}>Input Password</label>
                    <input
                        type="password"
                        className="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
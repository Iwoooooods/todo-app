import React from 'react'
import {fetchToken} from "./LoginPage/Auth";
import {API_DOMAIN} from "./consts";

export const UserContext = React.createContext();

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [expired, setExpired] = React.useState(false);
    const fetchCurrentUser = async () => {
        const token = fetchToken();
        const url = `${API_DOMAIN}/api/login/me?token=${token}`;
        try {
            const resp = await fetch(url);
            if (resp.status === 200) {
                const result = await resp.json();
                setCurrentUser(result);
            }else if (resp.status === 401) {
                localStorage.removeItem("token");
                setExpired(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserContext.Provider value={{currentUser, expired, fetchCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(UserContext)
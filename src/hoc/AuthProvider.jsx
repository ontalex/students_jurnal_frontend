import { createContext, useState } from "react";
import { BASE } from "../services/vars";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const check = (cb) => {
        fetch(`${BASE}/check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((data) => data.json())
            .then((json) => {
                if (json.type === "Accept") {
                    setUser({
                        userID: json.userID,
                        login: json.login,
                        token: localStorage.getItem("token"),
                    });
                    cb();
                }
            })
            .catch();
    };

    const signin = (newUser, cb, errorCb) => {
        let userData = {
            ...newUser,
        };

        fetch(`${BASE}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((data) => data.json())
            .then((json) => {
                if (json.type === "Accept") {
                    setUser({
                        userID: json.data.id,
                        login: json.data.login,
                        token: json.data.token,
                    });

                    localStorage.setItem("token", json.data.token);

                    cb();
                }
            })
            .catch(errorCb());
    };

    const signout = (cb) => {
        setUser(null);
        localStorage.removeItem("token");
        cb();
    };

    const value = { user, signin, signout, check };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

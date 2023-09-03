import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const check = (cb) => {
        fetch("https://ontalex.ru/alt/api/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((data) => data.json())
            .then((json) => {
                console.log(json);
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

        console.log(userData);

        fetch("https://ontalex.ru/alt/api/auth", {
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

                    console.group("signin Check");
                    console.log(userData);
                    console.log(user);
                    console.groupEnd();

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

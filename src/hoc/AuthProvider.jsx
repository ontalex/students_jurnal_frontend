import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const check = (cb) => {

        fetch("http://localhost:8080/api/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(
                data => data.json()
            )
            .then(
                json => {
                    console.log(json);
                    if(json.type === "Accept") {
                        setUser({token: localStorage.getItem("token")});
                        cb();
                    }
                }
            )
            .catch()

        
    }

    const signin = (newUser, cb, errorCb) => {

        let userData = {
            ...newUser
        };
        
        console.log(userData);

        fetch("http://localhost:8080/api/auth", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(
                data => data.json()
            )
            .then(
                json => {
                    if (json.type === "Accept") {
                        
                        setUser(userData);
                        
                        console.log(userData);

                        localStorage.setItem("token", json.data.token);

                        cb();
                    }
                }
            )
            .catch(
                errorCb()
            );

    }

    const signout = (cb) => {
        setUser(null);
        cb();
    }

    const value = { user, signin, signout, check };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}
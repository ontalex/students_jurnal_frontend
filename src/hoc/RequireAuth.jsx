import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        console.log("FROM REQUIREAUTH = ", user);
    });

    if (!user) {
        console.log(">> NAV to LOGIN");
        return (
            <Navigate
                // to={`${process.env.PUBLIC_URL}/login`}
                to={`login`}
                state={{ from: location }}
            />
        );
    }

    return children;
};

export { RequireAuth };

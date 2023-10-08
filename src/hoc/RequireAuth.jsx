import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { user } = useAuth();

    if (!user) {
        console.log(">> NAV to LOGIN");
        return (
            <Navigate
                to={`../login`}
                state={{ from: location }}
            />
        );
    }

    return children;
};

export { RequireAuth };

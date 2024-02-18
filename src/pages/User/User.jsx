import "./User.css";

import React from "react";
import { Outlet } from "react-router-dom";
import { MenuUser } from "../../components/MenuUser/MenuUser";

export default function User() {
    return (
        <>
            <div className="user_page">
                <div className="user_container">
                    <Outlet />
                </div>
            </div>
            <MenuUser />
        </>
    );
}
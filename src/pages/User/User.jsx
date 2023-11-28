import "./User.css";

import React from "react";
import { Menu } from "../../components/Menu/Menu";
import { Outlet } from "react-router-dom";

export default function User() {
    return (
        <div className="user_page">
            <div className="user_container">
                <Outlet/>
            </div>
            <Menu type="user" />
        </div>
    );
}
import { Outlet } from "react-router-dom";
import "./Admin.css";

import React from 'react'
import { Menu } from "../../components/Menu/Menu";

const Admin = () => {
  return (
    <div className="page">
        <div className="container">
            <Outlet/>
        </div>
        <Menu type="admin"/>
    </div>
  )
}

export default Admin
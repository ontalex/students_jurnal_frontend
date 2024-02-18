import { Outlet } from "react-router-dom";
import "./Admin.css";

import React from 'react';

import { MenuAdmin } from "../../components/MenuAdmin/MenuAdmin";

const Admin = () => {
  return (
    <>
      <div className="page">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <MenuAdmin />
    </>
  )
}

export default Admin
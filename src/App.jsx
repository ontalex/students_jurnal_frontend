import st from "./app.module.css";

import React from 'react'
import Admin from "./pages/Admin/Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminSchedule from "./pages/AdminSchedule/AdminSchedule";
import AdminLogbook from "./pages/AdminLogbook/AdminLogbook";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";

export default function App() {
  return (
    <div className={st.app}>
      <BrowserRouter>
        <Routes>

          <Route path="/admin" element={<Admin />}>

            <Route index element={<AdminHome/>} />
            <Route path="*" element={<AdminHome />} />

            <Route path="schedule" element={<AdminSchedule/>} />
            <Route path="logbook" element={<AdminLogbook/>} />
            <Route path="profile" element={<AdminProfile/>} />  

          </Route>

          <Route path="*" element={<Login/>} />

          <Route path="/login" element={<Login/>} />

          <Route path="/user" element={<User/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

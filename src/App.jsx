import st from "./app.module.css";

import React from "react";
import Admin from "./pages/Admin/Admin";

import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";

import AdminHome from "./pages/AdminHome/AdminHome";
import AdminSchedule from "./pages/AdminSchedule/AdminSchedule";
import AdminLogbook from "./pages/AdminLogbook/AdminLogbook";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import Login from "./pages/Login/Login";
import UserHome from "./pages/UserHome/UserHome";
import User from "./pages/User/User";

import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import Start from "./pages/Start/Start";
import AdminExport from "./pages/AdminExport/AdminExport";
import { UserStatistic } from "./pages/UserStatistic/UserStatistic";
import { Share } from "./pages/Share/Share";

export default function App() {
    
    return (
        <div className={st.app}>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route
                            path={`/`}
                            element={<Start />}
                        ></Route>

                        <Route
                            path={`admin`}
                            element={
                                <RequireAuth>
                                    <Admin />
                                </RequireAuth>
                            }
                        >
                            <Route index element={<AdminHome />} />

                            <Route
                                path="schedule"
                                element={<AdminSchedule />}
                            />
                            <Route path="logbook" element={<AdminLogbook />} />
                            <Route path="profile" element={<AdminProfile />} />
                            <Route path="export" element={<AdminExport/>} />
                        </Route>

                        <Route
                            path={`login`}
                            element={<Login />}
                        />

                        <Route
                            path={`user`}
                            element={<User />}
                        >
                            <Route index element={<UserHome/>} />
                            <Route
                                path={"statistic"}
                                element={<UserStatistic/>}
                            />
                        </Route>

                        <Route
                            path="/share/logbook/:short_token"
                            element={<Share/>}
                        />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

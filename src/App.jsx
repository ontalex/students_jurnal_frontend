import st from "./app.module.css";

import React from "react";
import Admin from "./pages/Admin/Admin";

import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";


import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import Start from "./pages/Start/Start";
import PopapLoading from "./components/PopapLoading/PopapLoading";

let AdminDuty = React.lazy(() => import("./pages/AdminDuty/AdminDuty"));
let AdminIndividual = React.lazy(() => import("./pages/AdminIndividual/AdminIndividual"));
let AdminHome = React.lazy(() => import("./pages/AdminHome/AdminHome"));
let AdminSchedule = React.lazy(() => import("./pages/AdminSchedule/AdminSchedule"));
let AdminLogbook = React.lazy(() => import("./pages/AdminLogbook/AdminLogbook"));
let AdminProfile = React.lazy(() => import("./pages/AdminProfile/AdminProfile"));
let Login = React.lazy(() => import("./pages/Login/Login"));
let User = React.lazy(() => import("./pages/User/User"));
let UserHome = React.lazy(() => import("./pages/UserHome/UserHome"));
let UserStatistic = React.lazy(() => import("./pages/UserStatistic/UserStatistic"));
let AdminExport = React.lazy(() => import("./pages/AdminExport/AdminExport"));
let Share = React.lazy(() => import("./pages/Share/Share"));

export default function App() {

    return (
        <div className={st.app}>
            <React.Suspense fallback={<PopapLoading />}>
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
                                <Route path="export" element={<AdminExport />} />
                                <Route path="individual" element={<AdminIndividual />} />
                                <Route path="duty" element={<AdminDuty></AdminDuty>}></Route>
                            </Route>

                            <Route
                                path={`login`}
                                element={<Login />}
                            />

                            <Route
                                path={`user`}
                                element={<User />}
                            >
                                <Route index element={<UserHome />} />
                                <Route
                                    path={"statistic"}
                                    element={<UserStatistic />}
                                />
                            </Route>

                            <Route
                                path="/share/logbook/:short_token"
                                element={<Share />}
                            />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </React.Suspense>
        </div>
    );
}

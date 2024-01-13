import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import "./MenuAdmin.css";

import Modal from "../Modal/Modal";

import { ReactComponent as Home_icon } from "../../pic/home_icon.svg";
import { ReactComponent as Notebook_icon } from "../../pic/notebook_icon.svg";
import { ReactComponent as Calendar_icon } from "../../pic/calendar_icon.svg";
import { ReactComponent as Logout_icon } from "../../pic/logout_icon.svg";
import { ReactComponent as Menu_icon } from "../../pic/menu_icon.svg";

import React, { useState } from "react";

export const MenuAdmin = () => {

    const { signout } = useAuth();
    let navigate = useNavigate();

    let logout = () => signout(() =>
        navigate(`/`, {
            replace: true,
        })
    )

    let [openMenu, setOpenMenu] = useState(false);

    return (
        <>
            <Modal open={openMenu} onClose={() => setOpenMenu(false)}>

                <div className="submenu">

                        <h2 className="submenu__header">Меню</h2>
                        <div className="submenu__links">
                            <NavLink 
                                to={"profile"}
                                className="submenu__link"
                                onClick={() => setOpenMenu(false)}
                            >
                                <span>Профиль</span>
                            </NavLink>
                        </div>

                </div>

            </Modal>
            <nav className="menu">
                <NavLink
                    to={``}
                    className={({ isPending }) =>
                        isPending ? "menu__link menu__link--active" : "menu__link"
                    }
                >
                    <Home_icon className="menu__icon" />
                    <span className="menu__name">Главная</span>
                </NavLink>

                <NavLink
                    to={`schedule`}
                    className={({ isActive }) =>
                        isActive ? "menu__link menu__link--active" : "menu__link"
                    }
                >
                    <Notebook_icon className="menu__icon" />
                    <span className="menu__name">Пары</span>
                </NavLink>

                <NavLink
                    to={`logbook`}
                    className={({ isActive }) =>
                        isActive ? "menu__link menu__link--active" : "menu__link"
                    }
                >
                    <Calendar_icon className="menu__icon" />
                    <span className="menu__name">Учёт</span>
                </NavLink>

                <button
                    className="menu__link"
                    onClick={() => setOpenMenu(true)}
                >
                    <Menu_icon className="menu__icon" />
                    <span className="menu__name">Меню</span>
                </button>

                <NavLink
                    to={"/"}
                    className={({ isPending }) =>
                        isPending ? "menu__link menu__link--active" : "menu__link"
                    }
                    onClick={logout}
                >
                    <Logout_icon className="menu__icon" />
                    <span className="menu__name">Выйти</span>
                </NavLink>

            </nav>
        </>
    );
};

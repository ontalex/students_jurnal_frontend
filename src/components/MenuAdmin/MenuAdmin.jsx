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
                        <NavLink
                            to={"export"}
                            className="submenu__link"
                            onClick={() => setOpenMenu(false)}
                        >
                            <span>Создать отчёт</span>
                        </NavLink>
                        <NavLink
                            to={"individual"}
                            className="submenu__link"
                            onClick={() => setOpenMenu(false)}
                        >
                            <span>Индивидуальные планы</span>
                        </NavLink>
                        <NavLink
                            to={"duty"}
                            className="submenu__link"
                            onClick={() => setOpenMenu(false)}
                        >
                            <span>Дежурства</span>
                        </NavLink>
                    </div>

                </div>

            </Modal>
            <nav className="menu__admin">

                <div className="menu__section">
                    <NavLink
                        to={``}
                        className={({ isPending }) =>
                            isPending ? "menu__admin__link menu__admin__link--active" : "menu__admin__link"
                        }
                    >
                        <Home_icon className="menu__admin__icon" />
                        <span className="menu__admin__name">Главная</span>
                    </NavLink>

                    <NavLink
                        to={`schedule`}
                        className={({ isActive }) =>
                            isActive ? "menu__admin__link menu__admin__link--active" : "menu__admin__link"
                        }
                    >
                        <Notebook_icon className="menu__admin__icon" />
                        <span className="menu__admin__name">Пары</span>
                    </NavLink>

                    <NavLink
                        to={`logbook`}
                        className={({ isActive }) =>
                            isActive ? "menu__admin__link menu__admin__link--active" : "menu__admin__link"
                        }
                    >
                        <Calendar_icon className="menu__admin__icon" />
                        <span className="menu__admin__name">Учёт</span>
                    </NavLink>
                </div>

                <div className="menu__section">
                    <button
                        className="menu__admin__link"
                        onClick={() => setOpenMenu(true)}
                    >
                        <Menu_icon className="menu__admin__icon" />
                        <span className="menu__admin__name">Меню</span>
                    </button>

                    <NavLink
                        to={"/"}
                        className={({ isPending }) =>
                            isPending ? "menu__admin__link menu__admin__link--active" : "menu__admin__link"
                        }
                        onClick={logout}
                    >
                        <Logout_icon className="menu__admin__icon" />
                        <span className="menu__admin__name">Выйти</span>
                    </NavLink>
                </div>

            </nav>
        </>
    );
};

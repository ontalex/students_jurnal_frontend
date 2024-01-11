import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import "./Menu.css";

import { ReactComponent as Home_icon } from "../../pic/home_icon.svg";
import { ReactComponent as Notebook_icon } from "../../pic/notebook_icon.svg";
import { ReactComponent as Calendar_icon } from "../../pic/calendar_icon.svg";
import { ReactComponent as Statistic_icon } from "../../pic/bar_shart.svg";
import { ReactComponent as Logout_icon } from "../../pic/logout_icon.svg";
import { ReactComponent as Menu_icon } from "../../pic/menu_icon.svg";

import React from "react";

export const Menu = ({ type }) => {

    const { signout } = useAuth();
    let navigate = useNavigate();

    return (
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

            {type === "admin" && <>
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

                <NavLink
                    to={"menu"}
                    className={({ isActive }) =>
                        isActive ? "menu__link menu__link--active" : "menu__link"
                    }
                >
                    <Menu_icon className="menu__icon" />
                    <span className="menu__name">Меню</span>
                </NavLink>

                <NavLink 
                    to={"/"}
                    className={({ isPending }) =>
                        isPending ? "menu__link menu__link--active" : "menu__link"
                    }
                    onClick={() =>
                        signout(() =>
                            navigate(`/`, {
                                replace: true,
                            })
                        )
                    }
                >
                    <Logout_icon className="menu__icon" />
                    <span className="menu__name">Выйти</span>
                </NavLink>
            </>}

            {type === "user" && <>
                <NavLink
                    to={`statistic`}
                    className={({ isPending }) =>
                        isPending ? "menu__link menu__link--active" : "menu__link"
                    }
                >
                    <Statistic_icon className="menu__icon" />
                    <span className="menu__name">Статистика</span>
                </NavLink>
                <NavLink 
                    to={"/"}
                    className={({ isPending }) =>
                        isPending ? "menu__link menu__link--active" : "menu__link"
                    }
                >
                    <Logout_icon className="menu__icon" />
                    <span className="menu__name">Выйти</span>
                </NavLink>
            </>}
        </nav>
    );
};

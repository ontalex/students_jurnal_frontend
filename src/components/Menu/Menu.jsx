import { NavLink } from "react-router-dom";

import "./Menu.css";

import { ReactComponent as Home_icon } from "../../pic/home_icon.svg";
import { ReactComponent as Notebook_icon } from "../../pic/notebook_icon.svg";
import { ReactComponent as Calendar_icon } from "../../pic/calendar_icon.svg";
import { ReactComponent as Profile_icon } from "../../pic/profile_icon.svg";
import { ReactComponent as Export_icon } from "../../pic/export_icon.svg";

import React from "react";

export const Menu = () => {
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
                to={`profile`}
                className={({ isActive }) =>
                    isActive ? "menu__link menu__link--active" : "menu__link"
                }
            >
                <Profile_icon className="menu__icon" />
                <span className="menu__name">Профиль</span>
            </NavLink>

            <NavLink
                to={`export`}
                className={({ isActive }) =>
                    isActive ? "menu__link menu__link--active" : "menu__link"
                }
            >
                <Export_icon className="menu__icon" />
                <span className="menu__name">Отчёт</span>
            </NavLink>
        </nav>
    );
};

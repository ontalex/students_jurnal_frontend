import { NavLink } from "react-router-dom";

import "./MenuUser.css";

import { ReactComponent as Home_icon } from "../../pic/home_icon.svg";
import { ReactComponent as Statistic_icon } from "../../pic/bar_shart.svg";
import { ReactComponent as Logout_icon } from "../../pic/logout_icon.svg";

import React from "react";

export const MenuUser = () => {

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
        </nav>
    );
};

import { NavLink } from "react-router-dom";

import "./Menu.css";

import {ReactComponent as Home_icon} from "../../pic/home_icon.svg";
import {ReactComponent as Notebook_icon} from "../../pic/notebook_icon.svg";
import {ReactComponent as Calendar_icon} from "../../pic/calendar_icon.svg";
import {ReactComponent as Profile_icon} from "../../pic/profile_icon.svg";
import {ReactComponent as Export_icon} from "../../pic/export_icon.svg";

import React from 'react'

export const Menu = () => {
  return (
    <nav className="menu">

      <NavLink to={`../admin`} className="menu__link">
        <Home_icon className="menu__icon" />
        <span className="menu__name">Главная</span>
      </NavLink>

      <NavLink to={`schedule`} className="menu__link">
        <Notebook_icon className="menu__icon" />
        <span className="menu__name">Пары</span>
      </NavLink>

      <NavLink to={`logbook`} className="menu__link">
        <Calendar_icon className="menu__icon" />
        <span className="menu__name">Учёт</span>
      </NavLink>
      
      <NavLink to={`profile`} className="menu__link">
        <Profile_icon className="menu__icon" />
        <span className="menu__name">Профиль</span>
      </NavLink>

      <NavLink to={`export`} className="menu__link">
        <Export_icon className="menu__icon" />
        <span className="menu__name">Отчёт</span>
      </NavLink>

    </nav>
  )
}

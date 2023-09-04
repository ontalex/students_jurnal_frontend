import React from "react";

import { NavLink } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../pic/logo.svg";

import st from "./style.module.css";

export default function Start() {
    return (
        <div className={st.page}>
            <LogoIcon className={st.logo} />

            <div className={st.container}>
                <h1 className={st.header}>Кто вы?</h1>

                <div className={st.links}>
                    <NavLink to={"user"} className={st.link}>
                        <span className={st.link_span}>Я - Студент</span>
                    </NavLink>

                    <NavLink to={"login"} className={st.link}>
                        <span className={st.link_span}>Я - Администратор</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

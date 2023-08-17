import React from 'react'

import st from "./style.module.css";

import {ReactComponent as PluseIcon} from "../../pic/pluse_icon.svg";

export default function NoneLesson(props) {
    return (
        <button className={st.btn}>
            <span>#{props.index + 1}</span>
            <PluseIcon className={st.btn_icon}/>
            <p className={st.btn_span}>Пара</p>
        </button>
    )
}

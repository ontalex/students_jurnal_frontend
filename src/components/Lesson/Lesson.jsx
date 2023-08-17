import React from 'react';

import st from "./style.module.css";

import { ReactComponent as EditIcon } from "../../pic/edit_icon.svg";
import { ReactComponent as DeleteIcon } from "../../pic/delete_icon.svg";

export default function Lesson({ lesson }) {
    return (
        <div className={st.lesson}>

            <div className={st.info}>
                <h2 className={st.info_lesson}>{lesson.name_lesson}</h2>
                <p className={st.info_teacher}>{lesson.teacher}</p>
                <p className={st.info_room}>Аудитория: {lesson.room}</p>
            </div>

            <button className={st.btn}>
                <EditIcon className={st.icon} />
            </button>

            <button className={st.btn}>
                <DeleteIcon className={st.icon} />
            </button>
            
        </div>
    )
}

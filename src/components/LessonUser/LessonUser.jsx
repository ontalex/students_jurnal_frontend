import React from 'react';

import st from "./style.module.css";

export default function Lesson({ lesson }) {
    return (
        <div className={st.lesson}>

            <span>№{lesson.number}</span>

            <div className={st.info}>

                <h2 className={st.info_lesson}>{lesson.name_lesson}</h2>
                <p className={st.info_teacher}>{lesson.teacher}</p>
                <p className={st.info_room}>Аудитория: {lesson.room}</p>
                
            </div>

        </div>
    )
}

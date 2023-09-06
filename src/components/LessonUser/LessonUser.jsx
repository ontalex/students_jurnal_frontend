import React, { useCallback, useEffect } from "react";

import st from "./style.module.css";

export default function Lesson({ lesson }) {
    let switchTimeLesson = useCallback(() => {
        switch (lesson.number) {
            case 1:
                return "9:00 - 10:30";
                break;
            case 2:
                return "10:50 - 12:20";
                break;
            case 3:
                return "12:40 - 14:10";
                break;
            case 4:
                return "14:30 - 16:00";
                break;
            case 5:
                return "14:30 - 16:40";
                break;
        };
    });

    useEffect(() => {
        console.log(lesson);
    });

    return (
        <div className={st.lesson}>
            <div className={st.lesson_about}>
                <p className={st.lesson_number}>Пара #{lesson.number}</p>
                <p className={st.lesson_time}>{switchTimeLesson()}</p>
            </div>

            <div className={st.info}>
                <h2 className={st.info_lesson}>{lesson.name_lesson}</h2>
                <p className={st.info_teacher}>{lesson.teacher}</p>
                <p className={st.info_room}>Аудитория: {lesson.room}</p>
            </div>
        </div>
    );
}

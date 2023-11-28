import React from 'react'
import PopapLoading from '../PopapLoading/PopapLoading'
import st from "./style.module.css";

export default function GridStatisticLessons({ data, loader }) {

        if (loader) {
                return (
                        <PopapLoading />
                )
        }

        return (
                <div className={st.grid_lessons}>
                        <div className={st.lesson_data}>
                                <div className={st.lesson_col}>
                                        <p className={st.col_header}>Название</p>
                                        <p className={st.col_header}>Пар</p>
                                </div>
                                {
                                        data?.list.map((lesson) => {
                                                return (
                                                        <div className={st.lesson_col}>
                                                                <p className={st.col_value}>{lesson.lesson}</p>
                                                                <p className={st.col_value}>{lesson.count_lesson}</p>
                                                        </div>
                                                )
                                        })
                                }
                        </div>
                </div>
        )

}

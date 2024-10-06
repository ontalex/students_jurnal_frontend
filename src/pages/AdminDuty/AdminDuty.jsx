import InputDate from "../../components/inputDate/InputDate";
import InputLesson from "../../components/inputLesson/InputLesson";
import st from "./AdminDuty.module.css";

import React from 'react'

export default function AdminDuty() {
    // мутация урока
    // мутация списка студентов (с данными по дежурствам)
    // мутация доступных дежурных
    // мутация новых дежурных

    // Состояние даты
    const [date, setDate] = React.useState(() => sessionStorage.getItem("select-day") || new Date().toISOString());

    // Состояние урока
    const [lesson, setLesson] = React.useState(null);

    // Состояние дежурных (массив двух элементов)
    const [dutyStudents, setDutyStudents] = React.useState([{}, {}]);

    // метод изменения даты
    const changeDate = (date) => {
        sessionStorage.removeItem("select-day");
        sessionStorage.setItem("select-day", new Date(date).toISOString());
        setDate(() => new Date(date).toISOString());
    }

    // метод изменения урока
    const changeLesson = (lesson) => {
        setLesson(() => lesson);
    }

    // метод изменения дежурных
    const changeDutyStudents = (student, numCell) => {
        if (!dutyStudents[numCell].name) {
            setDutyStudents((old) => {
                return old[numCell] = { name: student }
            })
        }
    }

    return (
        <>
            {/* Форма даты и пары */}
            <InputDate changeDate={() => { }} date={""} />
            <InputLesson changeLesson={() => { }} date={""} />

            {/* Форма создания Дежурства */}
            <form className={st.form}>
                <div className={[st.form__box, st.form__box__vertical]}>
                    <label className={st.form__label}>
                        {/* <InputStudentDuty date={""} lesson={""} changeStudent={changeDutyStudents} /> */}
                        <span className={st.form__span}></span>
                    </label>
                    <label className={st.form__label}>
                        {/* <InputStudentDuty date={""} lesson={""} changeStudent={changeDutyStudents} /> */}
                        <span className={st.form__span}></span>
                    </label>
                </div>
                <div className={[st.form__box, st.form__box__horizontal]}>
                    <button className={st.form__btn}>
                        <span>Создать</span>
                    </button>
                    <button className={st.form__btn}>
                        <span>Обновить</span>
                    </button>
                </div>
            </form>
        </>
    )
}

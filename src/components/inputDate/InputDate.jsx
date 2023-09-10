import st from "./style.module.css";

import { ReactComponent as CalendarIcon } from "../../pic/calendar_icon.svg";

import React, { useRef } from "react";

export default function InputDate({ changeDate, date }) {

    let inputRef = useRef();

    let handlerDate = (e) => {
        e.preventDefault();
        changeDate(e.target.value);
    };

    let handlerPrev = (e) => {
        let dateValue = new Date(date);
        let day = dateValue.getDate();
        dateValue.setDate(day - 1);

        console.log(dateValue);
        console.log(inputRef.current);
        inputRef.current.value = dateValue.toISOString().split('T')[0];

        changeDate(dateValue.toISOString().split('T')[0]);
    };

    let handlerNext = (e) => {
        let dateValue = new Date(date);
        let day = dateValue.getDate();
        dateValue.setDate(day + 1);

        console.log(dateValue);
        console.log(inputRef.current);
        inputRef.current.value = dateValue.toISOString().split('T')[0];

        changeDate(dateValue.toISOString().split('T')[0]);
    };

    return (
        <>
            <div>
                <div className={st.btns_date}>
                    <button className={st.btn_date} onClick={handlerPrev}>
                        Прошлый день
                    </button>
                    <button className={st.btn_date} onClick={handlerNext}>
                      Следующий день
                    </button>
                </div>
                <label htmlFor="date" className={st.box}>
                    <CalendarIcon className={st.icon} />
                    <p className={st.info}>
                        {new Intl.DateTimeFormat("ru", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }).format(new Date(date))}
                    </p>
                    <p className={st.info}>
                        {new Intl.DateTimeFormat("ru", {
                            weekday: "long",
                        }).format(new Date(date))}
                    </p>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        defaultValue={new Date(date).toISOString().split('T')[0]}
                        onChange={handlerDate}
                        ref={inputRef}
                        className={st.input}
                        min="2023-09-01"
                    />
                </label>
            </div>
        </>
    );
}

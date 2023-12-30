import st from "./style.module.css";

import { ReactComponent as CalendarIcon } from "../../pic/calendar_icon.svg";
import { ReactComponent as CaretRight } from "../../pic/caret_right.svg";

import React, { useRef } from "react";

export default function InputDate ({ changeDate, date }) {

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
            <div className={st.date_box}>

                <button className={st.btn_date} onClick={handlerPrev}>
                    <CaretRight className={[st.icon_btn, st.icon_btn_left].join(" ")} />
                </button>

                <label htmlFor="date" className={st.box}>
                    <div className={st.date_info}>
                        <CalendarIcon className={st.icon} />
                        <p className={st.info}>
                            {new Intl.DateTimeFormat("ru", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }).format(new Date(date))}
                        </p>
                    </div>
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

                <button className={st.btn_date} onClick={handlerNext}>
                    <CaretRight className={[st.icon_btn, st.icon_btn_right].join(" ")} />
                </button>

            </div>
        </>
    );
}

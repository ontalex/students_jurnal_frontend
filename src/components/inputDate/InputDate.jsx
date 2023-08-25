import st from "./style.module.css";

import { ReactComponent as CalendarIcon } from "../../pic/calendar_icon.svg";

import React from 'react'

export default function InputDate({changeDate, date}) {

    let handlerDate = (e) => {
      changeDate(e.target.value);
    } 

  return (  
    <>

        <label htmlFor="date" className={st.box}>
            <CalendarIcon className={st.icon}/>
            <input type="date" name="date" id="date" value={date} onChange={handlerDate} className={st.input}/>
            <p className={st.info}>{new Intl.DateTimeFormat("ru", {day:"numeric", month:"long", year:"numeric"}).format(new Date(date))}</p>
            <p className={st.info}>{new Intl.DateTimeFormat("ru", {weekday: "long"}).format(new Date(date))}</p>
        </label>

    </>
  ) 
}

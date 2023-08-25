import React, { useEffect, useState } from 'react';

import st from "./style.module.css";

export default function InputLesson(props) {

  let [schedule, setSchedule] = useState([]);

  useEffect(() => {
    console.log("lesson: ", props.lesson);
    console.log("date: ", props.date);

    let dateJSON = {
      "date_lesson": props.date
    };

    fetch("http://localhost:8080/api/schedule/day", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || ''
      },
      body: JSON.stringify(dateJSON)
    })
      .then(date => date.json())
      .then(
        (json) => {
          console.table(json);
          props.setLesson(json[0].id_schedule);
          setSchedule(json);
        }
      );

  }, []);


  return (
    <>
      <label htmlFor="lesson" className={st.box}>

        {Boolean(schedule.length) ? (
          <select 
            className={st.box_select} 
            name="schedule" 
            id="schedule_id" 
            onChange={(e) => props.setLesson(e.target.value)} 
            defaultValue={schedule[0]}>

            {
              schedule.map(
                (schedule) => {
                  return <option value={schedule.id_schedule} key={schedule.id_schedule}>
                    Пара {schedule.number}: {schedule.name_lesson}
                  </option>;
                }
              )
            }

          </select>) : <p>Нету пар</p>}

      </label>
    </>
  )
}

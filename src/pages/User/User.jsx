import Lesson from "../../components/LessonUser/LessonUser";
import InputDate from "../../components/inputDate/InputDate";
import "./User.css";

import React, { useEffect, useState } from 'react'

export default function User() {

  let [date, setDate] = useState(new Date());
  let [list, setList] = useState([]);

  useEffect(() => {

    let body = {
      "date_lesson": date
    }

    console.log(body);

    fetch("http://84.201.174.137:8080/api/schedule/day", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(data => data.json())
      .then(json => {
        console.log(json);
        setList(json);
      })

  }, [date]);

  return (
    <div className="user_page">

      <div className="user_container">

        <InputDate date={date} changeDate={setDate} />

        <div className="user_list">
          {
            Boolean(list.length) ? list.map(
              item => {
                return <Lesson lesson={item} />
              }
            ) : <p className="user_none">Нету пар</p>
          }
        </div>

      </div>

    </div>
  )
}

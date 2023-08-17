import Lesson from "../../components/Lesson/Lesson";
import NoneLesson from "../../components/NoneLesson/NoneLesson";
import InputDate from "../../components/inputDate/InputDate";
import "./AdminSchedule.css";

import React, { useEffect, useState } from 'react';

const AdminSchedule = () => {

  let [list, setList] = useState([{}, {}, {}, {}, {}]);

  let [date, setDate] = useState(() => { return new Date() });

  useEffect(() => {

    let dateJSON = {
      "date_lesson": date
    }

    fetch("http://localhost:8080/api/schedule/day", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dateJSON)
    }).then(date => date.json()).then(
      (json) => {
        
        let temp = [{}, {}, {}, {}, {}];

        for (let i = 0; i < json.length; i++) {
          temp[json[i].number - 1] = json[i];
        }

        setList(temp);

        console.log(json, temp);
      }
    )

    return () => {}

    }, [date]);


  let changeDate = (date) => {
    setDate(date);
    console.log("Rerender on 'changeDate'");
  };

  return (
    <>
      <InputDate date={date} changeDate={changeDate} />
      <div className="list">
        {/* <p>{date.toLocaleDateString("ru", {day:"2-digit", month:"2-digit", year:"numeric"})}</p> */}
        {
          list.map((lesson, index) => {
            return Boolean(lesson?.name_lesson) ?
              <Lesson lesson={lesson} index={index} /> :
              <NoneLesson index={index} />
          })
        }
      </div>
    </>
  )
}

export default AdminSchedule

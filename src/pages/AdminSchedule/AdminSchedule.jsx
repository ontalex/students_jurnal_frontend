import Lesson from "../../components/Lesson/Lesson";
import NoneLesson from "../../components/NoneLesson/NoneLesson";
import InputDate from "../../components/inputDate/InputDate";
import "./AdminSchedule.css";

import React, { useEffect, useState, useMemo } from 'react';

const AdminSchedule = () => {

  let [list, setList] = useState([{}, {}, {}, {}, {}]);
  let [date, setDate] = useState(() => { return new Date() });
  let [teachers, setTeachers] = useState([]);
  let [lessons, setLessons] = useState([]);


  let fetchDateLessons = async () => {
    const response = await fetch('http://localhost:8080/api/lessons');
    const result = await response.json();
    setLessons(result);
  };

  let fetchDateTeachers = async () => {
    const response = await fetch('http://localhost:8080/api/teachers');
    const result = await response.json();
    setTeachers(result);
  }

  useEffect(() => {
    fetchDateTeachers();
    fetchDateLessons();
  }, []);

  const memoizedTeachers = useMemo(() => teachers, [teachers]);
  const memoizedLessons = useMemo(() => lessons, [lessons]);

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

    return () => { }

  }, [date]);


  let changeDate = (date) => {
    setDate(date);
    console.log("Rerender on 'changeDate'");
  };

  return (
    <>
      <InputDate date={date} changeDate={changeDate} />
      <div className="list">
        {
          list.map((lesson, index) => {
            return Boolean(lesson?.name_lesson) ?
              <Lesson lesson={lesson} index={index} /> :
              <NoneLesson index={index} lessons={memoizedLessons} teachers={memoizedTeachers} />
          })
        }
      </div>
    </>
  )
}

export default AdminSchedule
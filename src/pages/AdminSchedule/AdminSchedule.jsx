import { useMutation } from "react-query";
import Lesson from "../../components/LessonAdmin/LessonAdmin";
import NoneLesson from "../../components/NoneLesson/NoneLesson";
import InputDate from "../../components/inputDate/InputDate.jsx";
import "./AdminSchedule.css";

import { getDaySchedule } from "../../services/schedule.service";

import React, { useEffect, useState, useMemo } from 'react';
import PopapError from "../../components/PopapError/PopapError";
import PopapLoading from "../../components/PopapLoading/PopapLoading";
import useFormateLessons from "../../hooks/useFormateLessons.js";
import { BASE } from "../../services/vars.js";

const AdminSchedule = () => {

  let [list, setList] = useState([{}, {}, {}, {}, {}]);
  let [outSchedule, setOutSchedule] = useState([{}]);
  let [date, setDate] = useState(() => { return new Date().toISOString().split("T")[0] });
  let [teachers, setTeachers] = useState([]);
  let [lessons, setLessons] = useState([]);


  useEffect(() => {
    const fetchDateLessons = async () => {
      const response = await fetch(`${BASE}/lessons`);
      const result = await response.json();
      setLessons(result);
    };

    const fetchDateTeachers = async () => {
      const response = await fetch(`${BASE}/teachers`);
      const result = await response.json();
      setTeachers(result);
    };

    fetchDateTeachers();
    fetchDateLessons();
  }, []);

  const memoizedTeachers = useMemo(() => teachers, [teachers]);
  const memoizedLessons = useMemo(() => lessons, [lessons]);

  let requestScheduleDay = useMutation({
    mutationFn: (date) => getDaySchedule(date),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    onSuccess: (json) => {
      console.log("LIST SCHEDULE: ", json);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useFormateLessons(json, setList);
      console.log("JSON: ", json);
      setOutSchedule(() => json.out_schedule);
    }
  });

  useEffect(() => {
    if (!teachers.length || !lessons.length) {
      return;
    }

    requestScheduleDay.mutate(date);

    console.log("DATA OUT SCHEDULE: ", outSchedule);

    return () => { };

  }, [date, teachers, lessons]);


  let changeDate = (date) => {
    setDate(date);
  };

  return (
    <>
      <InputDate date={date} changeDate={changeDate} />
      {/* <p>{JSON.stringify(outSchedule)}</p> */}
      {
        Boolean(outSchedule?.length > 0) ? <div>
          <a href={outSchedule[0]?.path}>{outSchedule[0]?.title}</a>
        </div> : null
      }
      {requestScheduleDay.isError && <PopapError />}
      {requestScheduleDay.isLoading && <PopapLoading />}
      <div className="list">
        {
          list.map((lesson, index) => {
            return Boolean(lesson?.name_lesson) ?
              <Lesson
                date={date}
                index={index}
                lesson={lesson}
                lessons={memoizedLessons}
                teachers={memoizedTeachers}
                changeDate={changeDate}
              /> :
              <NoneLesson
                date={date}
                index={index}
                lessons={memoizedLessons}
                teachers={memoizedTeachers}
                changeDate={changeDate}
              />
          })
        }
      </div>
    </>
  )
}

export default AdminSchedule
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

const AdminSchedule = () => {

  let [list, setList] = useState([{}, {}, {}, {}, {}]);
  let [date, setDate] = useState(() => { return new Date() });
  let [teachers, setTeachers] = useState([]);
  let [lessons, setLessons] = useState([]);


  useEffect(() => {
    const fetchDateLessons = async () => {
      const response = await fetch('https://ontalex.ru/alt/api/lessons');
      const result = await response.json();
      setLessons(result);
    };

    const fetchDateTeachers = async () => {
      const response = await fetch('https://ontalex.ru/alt/api/teachers');
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
    onSuccess: (json) => useFormateLessons(json, setList)
  });

  useEffect(() => {
    if (!teachers.length || !lessons.length) {
      return;
    }

    requestScheduleDay.mutate(date);

    return () => { };

  }, [date, teachers, lessons]);


  let changeDate = (date) => {
    setDate(date);
  };

  return (
    <>
      <InputDate date={date} changeDate={changeDate} />
      {requestScheduleDay.isError && <PopapError/>}
      {requestScheduleDay.isLoading && <PopapLoading/>}
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
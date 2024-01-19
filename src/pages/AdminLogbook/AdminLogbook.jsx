import { useEffect } from "react";
import InputDate from "../../components/inputDate/InputDate.jsx";
import InputLesson from "../../components/inputLesson/InputLesson.jsx";
import LogItem from "../../components/LogItem/LogItem";
import { YandexShare } from "../../components/YandexShare/YandexShare.jsx";

import PopapLoading from "../../components/PopapLoading/PopapLoading";
import PopapError from "../../components/PopapError/PopapError";

import { useMutation } from "react-query";
import "./AdminLogbook.css";

import React, { useState } from 'react'
import { getLogs } from "../../services/logbook.service.js";
import { BASE } from "../../services/auth.service.js";

export default function AdminLogbook() {

  let [logs, setLogs] = useState([]);
  let [date, setDate] = useState(() => { return new Date() });

  let [lesson, setLesson] = useState();
  let [share, setShare] = useState("");

  const fetchGetLogs = async () => {

    const response = await fetch(`${BASE}/shortcreate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || ""
      },
      body: JSON.stringify(
        {
          "date_lesson": new Date(date).toISOString().split("T")[0],
          "number_lesson": lesson
        }
      )
    });
    return response.json();
  };

  const handleShare = () => {
    logsMutation.mutate()
  }

  let { mutate, isLoading, isError } = useMutation({
    mutationFn: (id) => getLogs(id),
    onSuccess: (data) => {
      setLogs(data);
    }
  });

  let logsMutation = useMutation({
    mutationFn: (date, lesson) => fetchGetLogs(date, lesson),
    onSuccess: (data) => {
      setShare(window.location.origin + "/p/apps/jurnal/#/share/logbook/" + data.token)
    }
  })

  useEffect(() => {

    if (lesson) {
      mutate(lesson)
    }

  }, [lesson, date]);

  return (
    <>
      <InputDate changeDate={setDate} date={date} />
      <InputLesson changeLesson={setLesson} date={date} />

      {isLoading && <PopapLoading />}
      {isError && <PopapError />}

      <button className="logbook__share__btn" onClick={(date, lesson) => handleShare(date, lesson)}><span>Поделиться</span></button>

      {
        logsMutation.isSuccess &&
        <div className="logbook__share">
          <YandexShare link={share} />
          <a href={share}>Список посещаемости</a>
        </div>
      }

      <div className="logbook_list">

        {

          Boolean(logs.length) && Boolean(lesson) && !isLoading ?
            logs.map(
              (student, index) =>
                <LogItem
                  id_lesson={lesson}
                  student_name={student.full_name}
                  id_student={student.id_student}
                  log_state={student.type_log || ''}
                  id_log={student.id_log}
                  key={student.id_student}
                />
            ) :
            null
        }
      </div>
    </>
  )
}

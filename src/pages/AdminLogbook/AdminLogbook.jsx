import { useEffect } from "react";
import InputDate from "../../components/inputDate/InputDate.jsx";
import InputLesson from "../../components/inputLesson/InputLesson.jsx";
import LogItem from "../../components/LogItem/LogItem";
import { YandexShare } from "../../components/YandexShare/YandexShare.jsx";

import PopapLoading from "../../components/PopapLoading/PopapLoading";
import PopapError from "../../components/PopapError/PopapError";

import { useMutation } from "react-query";
import { BASE } from "../../services/vars.js";
import "./AdminLogbook.css";

import React, { useState } from 'react'
import { getLogs } from "../../services/logbook.service.js";

export default function AdminLogbook() {

  let [logs, setLogs] = useState([]);
  let [date, setDate] = useState(() => { return new Date() });

  let [lesson, setLesson] = useState(null);
  let [share, setShare] = useState("");

  const fetchGetLogs = React.useCallback(async (dateReq, lessonReq) => {

    const response = await fetch(`${BASE}/shortcreate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || ""
      },
      body: JSON.stringify(
        {
          "date_lesson": new Date(dateReq).toISOString().split("T")[0],
          "number_lesson": lessonReq
        }
      )
    });
    return response.json();
  }, []);

  const handleShare = () => {
    logsMutation.mutate()
  }

  let mutateMainLogs = useMutation({ // мутация основного списка
    mutationFn: (id, date) => getLogs(id, date),
    onSuccess: (data) => {
      setLogs(data);
    }
  });

  let logsMutation = useMutation({ // мутация для короткой ссылки логов
    mutationFn: (dateReq, lessonReq) => fetchGetLogs(dateReq, lessonReq),
    onSuccess: (data) => {
      setShare(window.location.origin + "/p/apps/jurnal/#/share/logbook/" + data.token)
    }
  })

  useEffect(() => {

    if (lesson) {
      mutateMainLogs.mutate(lesson, date)
    }

    console.log("LESSTON USEEFFECT: ", lesson);
    console.log("DATE USEEFFECT: ", date);

  }, [lesson, date]);

  return (
    <>
      <InputDate changeDate={setDate} date={date} />
      <InputLesson changeLesson={setLesson} date={date} />

      {mutateMainLogs.isLoading && <PopapLoading />}
      {mutateMainLogs.isError && <PopapError />}

      <button className="logbook__share__btn" onClick={(date, lesson) => handleShare(date, lesson)}><span>Поделиться</span></button>

      {
        Boolean(lesson) && logsMutation.isSuccess &&
        <div className="logbook__share">
          <YandexShare link={share} />
          <a href={share}>Список посещаемости</a>
        </div>
      }

      <div className="logbook_list">

        {

          Boolean(logs.length) && Boolean(lesson) && !mutateMainLogs.isLoading ?
            logs.map(
              (student, index) =>
                <LogItem
                  id_lesson={lesson}
                  student_name={student.full_name}
                  id_student={student.id_student}
                  log_state={student.type_log || ''}
                  id_log={student.id_log}
                  key={student.id_student}
                  date_start={student.date_start}
                  date_end={student.date_end}
                />
            ) :
            null
        }
      </div>
    </>
  )
}

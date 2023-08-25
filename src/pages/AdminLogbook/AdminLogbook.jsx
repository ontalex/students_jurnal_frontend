import { useEffect, useMemo } from "react";
import InputDate from "../../components/inputDate/InputDate";
import InputLesson from "../../components/inputLesson/InputLesson";
import LogItem from "../../components/LogItem/LogItem";
import { useMutation } from "react-query";
import "./AdminLogbook.css";

import React, { useState } from 'react'
import { getLogs } from "../../services/logbook.service";

export default function AdminLogbook() {

  let [logs, setLogs] = useState([]);
  let [date, setDate] = useState(() => { return new Date() });
  let [lesson, setLesson] = useState();

  let { mutate, isLoading } = useMutation({
    mutationFn: (id) => getLogs(id),
    onSuccess: (data, variables, context) => {
      console.log(logs);
      setLogs(data);
    }
  })

  useEffect(() => {
    mutate(lesson)
  }, [lesson, date]);

  return (
    <>
      <InputDate changeDate={setDate} date={date} />
      <InputLesson changeLesson={setLesson} date={date} />
      {isLoading ? <p>Loading...</p> : null}
      <div>
        {
          Boolean(logs.length) && Boolean(lesson) && !isLoading ?
            logs.map(
              (student, index) =>
                <LogItem
                  id_lesson={lesson}
                  student_name={student.full_name}
                  id_student={student.id_student}
                  key={student.id_student}
                  log_state={student.type_log || ''}
                />
            ) :
            <p className="logbook_none">Нету данных :(</p>
        }
      </div>
    </>
  )
}

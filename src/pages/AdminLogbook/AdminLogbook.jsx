import { useEffect, useMemo } from "react";
import InputDate from "../../components/InputDate/InputDate";
import InputLesson from "../../components/InputLesson/InputLesson";
import LogItem from "../../components/LogItem/LogItem";

import PopapLoading from "../../components/PopapLoading/PopapLoading";
import PopapError from "../../components/PopapError/PopapError";

import { isError, useMutation } from "react-query";
import "./AdminLogbook.css";

import React, { useState } from 'react'
import { getLogs } from "../../services/logbook.service";

export default function AdminLogbook() {

  let [logs, setLogs] = useState([]);
  let [date, setDate] = useState(() => { return new Date() });
  let [lesson, setLesson] = useState();

  let { mutate, isLoading, isError } = useMutation({
    mutationFn: (id) => getLogs(id),
    onSuccess: (data) => {
      setLogs(data);
    }
  })

  useEffect(() => {
    if(lesson) {
      mutate(lesson)
    }
  }, [lesson, date]);

  return (
    <>
      <InputDate changeDate={setDate} date={date} />
      <InputLesson changeLesson={setLesson} date={date} />

      {isLoading && <PopapLoading/>}
      {isError && <PopapError/>}

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

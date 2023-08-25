import { useEffect, useMemo } from "react";
import InputDate from "../../components/inputDate/InputDate";
import InputLesson from "../../components/inputLesson/InputLesson";
import LogItem from "../../components/LogItem/LogItem";
import "./AdminLogbook.css";

import React, { useState } from 'react'

export default function AdminLogbook() {

  let [date, setDate] = useState(() => { return new Date() });
  let [lesson, setLesson] = useState();

  return (
    <>
      <InputDate changeDate={setDate} date={date} />
      <InputLesson setLesson={setLesson} date={date} />
      <div>
        {
          Boolean([].length) && Boolean(lesson) ?
            [].map(
              (student, index) =>
                <LogItem
                  id_lesson={lesson}

                  student_name={student.full_name}
                  id_student={student.id_student}
                  key={student.id_student}
                  log_state={""}
                />
            ) :
            <p className="logbook_none">Нету данных :(</p>
        }
      </div>
      <span>IDLesson: {lesson}</span>
    </>
  )
}

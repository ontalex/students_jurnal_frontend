import React, { useEffect, useState } from 'react';

import st from "./style.module.css";
import { useMutation } from 'react-query';
import { getDaySchedule } from '../../services/schedule.service';

export default function InputLesson({ changeLesson, date }) {

  let [schedule, setSchedule] = useState([]);

  let lessons = useMutation({
    mutationFn: (date_lesson) => getDaySchedule(date_lesson),
    onSuccess: (data, variables, context) => {
      console.table(data);
      setSchedule(data);
      if (data.length > 0) {
        changeLesson(data[0]?.id_schedule || null);
        console.log(data[0]);
      }
    }
  })

  useEffect(() => {
    // lessons.mutateAsync("2024-09-02");
    lessons.mutateAsync(date);
    console.log("Date: ", date);
  }, [date]);


  return (
    <>
      <label htmlFor="lesson" className={st.box}>

        {Boolean(schedule.length) ? (
          <select
            className={st.box_select}
            name="schedule"
            id="schedule_id"
            onChange={(e) => changeLesson(Number(e.target.value))}
            defaultValue={schedule[0]}>

            {
              schedule.map(
                (schedule) => {
                  return <option value={schedule.id_schedule} key={schedule.id_schedule}>
                    Пара {schedule.number}: {schedule.name_lesson}
                  </option>;
                }
              )
            }

          </select>) : <p className={st.box_select_none}>Нету данных на день</p>}

      </label>
    </>
  )
}

import React, { useEffect, useState } from 'react';

import st from "./style.module.css";
import { useMutation } from 'react-query';
import { getDaySchedule } from '../../services/schedule.service';

export default function InputLesson(props) {

  let [schedule, setSchedule] = useState([]);

  let lessons = useMutation({
    mutationFn: (date_lesson) => getDaySchedule(date_lesson),
    onSuccess: (data, variables, context) => {
      console.table(data);
      setSchedule(data);
      props.changeLesson(data[0]?.id_schedule || null);
    }
  })

  useEffect(() => {
    lessons.mutateAsync(props.date);
  }, [props.date]);


  return (
    <>
      <label htmlFor="lesson" className={st.box}>

        {Boolean(schedule.length) ? (
          <select
            className={st.box_select}
            name="schedule"
            id="schedule_id"
            onChange={(e) => props.changeLesson(Number(e.target.value))}
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

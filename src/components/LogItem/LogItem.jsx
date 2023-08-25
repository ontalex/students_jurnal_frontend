import React from 'react';

import st from "./style.module.css";
import { useMutation } from 'react-query';
import { pushState, updateLog } from '../../services/logbook.service';

export default function LogItem(props) {

    let pushStateQuery = useMutation({
        mutationFn: (data) => pushState(data)
    })

    let updateState = useMutation({
        mutationFn: (data) => updateLog(data)
    })

    let handlerChose = (e) => {

        if (e.target.value !== "" && props.log_type) {

            console.group("handlerChose (new state)");
            console.log("Chose: ", e.target.value);
            console.table({ 
                id_student: props.id_student, 
                id_lesson: props.id_lesson, 
                type_log: e.target.value 
            });
            console.groupEnd();

            pushStateQuery.mutate(
                { 
                    id_student: props.id_student, 
                    id_lesson: props.id_lesson, 
                    type_log: e.target.value 
                }
            )
        }

        if (e.target.value !== props.log_type) {

            console.group("handlerChose (update state)");
            console.log("Chose to update: ", e.target.value);
            console.table({
                type_log: e.target.value,
                id: props.id_log
            });
            console.groupEnd();

            updateState.mutate(
                {
                    type_log: e.target.value,
                    id: props.id_log
                }
            )
        }
    }


    return (
        <div className={st.log}>
            <p className={st.name}>{props.student_name}</p>
            {pushStateQuery.isLoading && <span>Отправка...</span>}
            {pushStateQuery.isError && <span>Ошибка!</span>}
            <select name="state" id="" className={st.select} onChange={handlerChose} defaultValue={props.log_state || ""}>
                <option value="">На месте</option>
                <option value="н">Прогул</option>
                <option value="нб">Болезнь</option>
                <option value="ну">Уважительная</option>
                <option value="о">Опоздание</option>
            </select>
        </div>
    )
}

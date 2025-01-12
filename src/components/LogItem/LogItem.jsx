import React, { useEffect, useState } from "react";

import st from "./style.module.css";
import { useMutation } from "react-query";
import PopapLoading from "../PopapLoading/PopapLoading";
import {
    deleteLog,
    extendLogbook,
    pushState,
    updateLog,
} from "../../services/logbook.service";

export default function LogItem(props) {

    let choseType = (logType) => {
        switch (logType.trim()) {
            case "н":
                return st.log_n;
            case "нб":
                return st.log_nb;
            case "ну":
                return st.log_ny;
            case "о":
                return st.log_o;
            default:
                return st.log_def;
        }
    };

    let [styleLog, setStyleLog] = useState([st.log, choseType(props.log_state)].join(" "));

    let [log, setLog] = useState({
        id: props.id_log,
        type: props.log_state,
    });

    let extendState = useMutation({
        mutationFn: (data) => extendLogbook(data),
        onSuccess: (data, vars, context) => {
            console.table(data);
            console.table(vars);
            console.table(context);
        }
    })

    let pushStateQuery = useMutation({
        mutationFn: (data) => pushState(data),
        onSuccess: (data, vars, context) => {
            setLog({
                id: data[0].id_log,
                type: data[0].type_log,
            });
            setStyleLog(() => [st.log, choseType(vars.type_log)].join(" "));
        },
    });

    let updateState = useMutation({
        mutationFn: (dataBody) => updateLog(dataBody),
        onSuccess: (data, vars, context) => {
            setLog({
                id: data[0]?.id_log || log.id,
                type: data[0]?.type_log || log.type,
            });
            setStyleLog(() => [st.log, choseType(vars.type_log)].join(" "));
        },
    });

    let deleteState = useMutation({
        mutationFn: (id) => deleteLog(id),
        onSuccess: (data, vars, context) => {
            setLog({
                ...log,
                type: undefined,
            });
            setStyleLog(() => [
                st.log,
                choseType(''),
                Boolean(props.date_start != null) && Boolean(props.date_end != null) ? st.iup : ""
            ].join(" ")
            );
        },
    });

    let handlerChose = (e) => {
        if (e.target.value !== "-" && log.id === null) {
            console.log("handlerChose (new state)");

            pushStateQuery.mutate({
                id_student: props.id_student,
                id_lesson: props.id_lesson,
                type_log: e.target.value,
            });
        } else if (e.target.value === "-" && log.id !== undefined) {
            deleteState.mutate(log.id);
        } else if (log.type !== e.target.value && log.id !== undefined) {
            updateState.mutate({
                id: log.id,
                type_log: e.target.value,
            });
        }

        console.groupEnd();
    };

    let handlerExtend = async () => {
        await extendLogbook({
            type_log: props.log_state,
            id_student: props.id_student,
            id_lesson: props.id_lesson
        })
    }

    useEffect(() => {
        console.log(props.id_student, "=", props.log_state);
    }, [props.id_student, props.log_state])

    return (
        <label className={styleLog}>
            <div className={st.state_top}>
                <div className={st.state_marks}>
                    {
                        Boolean(props.date_start != null) &&
                            Boolean(props.date_end != null) ?
                            <p className={st.iup_text}>ИУП</p> :
                            null
                    }
                </div>
                <div className={st.state_box}>
                    {pushStateQuery.isLoading && (
                        <PopapLoading size_w={20} size_h={20} />
                    )}
                    {pushStateQuery.isError && (
                        <span className={st.log_error}>Ошибка!</span>
                    )}
                </div>
            </div>
            <div className={st.state_info}>
                <p className={st.log_name}>{props.student_name}</p>
                <select
                    name="state"
                    id="state"
                    className={st.select}
                    onChange={handlerChose}
                    defaultValue={props.log_state || ""}
                >
                    <option value="-">На месте</option>
                    <option value="н">Прогул</option>
                    <option value="нб">Болезнь</option>
                    <option value="ну">Уважительная</option>
                    <option value="о">Опоздание</option>
                </select>
            </div>
            <div className={st.state_functions}>
                {
                    Boolean(!["-", "о", ""].includes(props.log_state.trim())) ?
                        <button className={st.functions_btn} onClick={handlerExtend}>
                            <span>Продлить</span>
                        </button> :
                        null
                }
            </div>
        </label>
    );
}

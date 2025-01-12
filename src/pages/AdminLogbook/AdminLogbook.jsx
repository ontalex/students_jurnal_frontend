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
import * as logService from "../../services/logbook.service.js";

export default function AdminLogbook() {

    let [logs, setLogs] = useState([]);
    let [date, setDate] = useState(() => { return new Date().toISOString().split("T")[0] });

    let [lesson, setLesson] = useState(null);
    let [share, setShare] = useState("");

    let mutateMainLogs = useMutation({ // мутация основного списка
        mutationFn: (id, date) => logService.getLogs(id, date),
        onSuccess: (data) => {
            setLogs(data);
        }
    });

    let logsMutation = useMutation({ // мутация для короткой ссылки логов
        mutationFn: (data) => logService.getLogsShort(data),
        onSuccess: (data) => {
            setShare(window.location.origin + "/p/apps/jurnal/#/share/logbook/" + data.token)
        }
    })

    useEffect(() => {
        if (lesson) {
            mutateMainLogs.mutate(lesson, date)
        }
        setLesson(null);
    }, [date]);

    useEffect(() => {
        if (lesson) {
            mutateMainLogs.mutate(lesson, date)
        }
    }, [lesson]);

    /// ======== fot test ================
    useEffect(() => {
        console.table({
            date: date,
            lesson_id: lesson,
            logs: logs
        })
    }, [date, lesson])
    /// ==================================

    const handleShare =
        () => {
            console.log(
                "Shere",
                date, lesson
            );
            logsMutation.mutate([date, lesson])
        }

    return (
        <>
            <InputDate changeDate={setDate} date={date} />
            <InputLesson changeLesson={setLesson} date={date} />

            {mutateMainLogs.isLoading && <PopapLoading />}
            {mutateMainLogs.isError && <PopapError />}

            <button className="logbook__share__btn" onClick={() => handleShare(date, lesson)}><span>Поделиться</span></button>

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
                            (student, index) => {
                                let key = [lesson, student.id_student, student.type_log || '', student.id_log].join("_");
                                console.log("KEY:", key);
                                return (<LogItem
                                    id_lesson={lesson}
                                    student_name={student.full_name}
                                    id_student={student.id_student}
                                    log_state={student.type_log || ''}
                                    id_log={student.id_log}
                                    key={key}
                                    date_start={student.date_start}
                                    date_end={student.date_end}
                                />)
                            }
                        ) :
                        null
                }
            </div>
        </>
    )
}

import React, { useEffect, useState } from "react";

import st from "./style.module.css";

import st_prev from "./previewComponent.module.css"

import { ReactComponent as PluseIcon } from "../../pic/pluse_icon.svg";
import Modal from "../Modal/Modal";
import { BASE } from "../../services/vars";
import useFetch from "../../hooks/useFetch";
import PopapLoading from "../PopapLoading/PopapLoading";
import PopapError from "../PopapError/PopapError";
import axios from "axios";

function PrevSchedule({ date, number_lesson, setOpen, disabled, setDisable }) {
    let [id, setId] = useState();
    const fetchPrevSchedule = useFetch(
        "get",
        {
            url: `${BASE}/schedule/prev`,
            params: { number_lesson: number_lesson, date_lesson: date },
            headers: {
                "Content-Type": "application/json"
            }
        },
        true
    );
    const fetchSavePrevSchedule = useFetch(
        "post",
        {
            url: `${BASE}/schedule/prev`
        },
        false,
        () => { setOpen(false) }
    )
    const handleCLick = (event) => {
        event.preventDefault();
        pushPrevSchedule(fetchPrevSchedule.data[0].id_schedule);
    }
    const pushPrevSchedule = (id) => {
        setDisable(true);
        setId(id);
        fetchSavePrevSchedule.refresh({
            url: `${BASE}/schedule/prev`,
            params: { id },
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || ""
            }
        });
        setDisable(false);
    }
    return (
        <>
            {fetchPrevSchedule.loading && <PopapLoading />}
            {fetchPrevSchedule.error && <PopapError />}
            {fetchPrevSchedule.data && fetchPrevSchedule.data[0] ? <div className={st_prev.box}>

                <div className={st_prev.info}>
                    <h1 className={st_prev.info__name}>{fetchPrevSchedule.data[0].name_lesson}</h1>
                    <div className={st_prev.about}>
                        <p className={st_prev.about__lesson}>№{fetchPrevSchedule.data[0].number_lesson}</p>
                        <p className={st_prev.about__teacher}>{fetchPrevSchedule.data[0].fullname}</p>
                    </div>
                </div>
                <button className={st_prev.btn} onClick={handleCLick}>
                    {fetchSavePrevSchedule.loading && <PopapLoading />}
                    <span className={st_prev.btn_span}>Скопировать</span>
                </button>
            </div> : null}
        </>
    )
}

export default function NoneLesson(props) {

    let [open, setOpen] = useState(false);
    let [disable, setDisable] = useState(false);

    let handlerSubmit = (e) => {
        e.preventDefault();

        if (e.target.lesson.value === "" || e.target.teacher.value === "" || e.target.room.value === "") {
            alert("Есть пустоты");
            return true;
        }

        let data = {
            date_lesson: new Date(props.date).toUTCString(),
            number_lesson: props.index + 1,
            name_lesson: e.target.lesson.value, // id_lesson
            fullname_teacher: e.target.teacher.value, // id_teacher
            room: e.target.room.value.trim(),
            is_exam: e.target.is_exam.value,
            is_cancel: e.target.is_cancel.value,
        }

        console.log(data);

        fetch(`${BASE}/schedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        })
            .then(
                data => data.json()
            )
            .then(
                json => {
                    console.log(json);

                    e.target.lesson.value = 0;
                    e.target.teacher.value = 0;
                    e.target.room.value = 0;

                    props.changeDate(new Date(props.date));

                    setOpen(false);
                }
            )
            .catch()

    };

    return (
        <>
            <button className={st.btn} onClick={() => setOpen(true)}>

                <PluseIcon className={st.btn_icon} />
                <p className={st.btn_span}>Пара</p>

            </button>

            <Modal open={open} onClose={() => setOpen(false)}>

                <h2 className={st.modal_header}>Создать пару</h2>
                <form action="" onSubmit={handlerSubmit} className={st.form}>

                    <input disabled={disable} list="lessons" name="lesson" className={st.form_input} type="text" placeholder="Пара" />
                    <datalist id="lessons">
                        {

                            props.lessons && props.lessons.map(
                                (item) => {
                                    return <option value={item.name_lesson} key={item.id_lesson} />
                                }
                            )

                        }
                    </datalist>

                    <input disabled={disable} list="teachers" name="teacher" className={st.form_input} type="text" placeholder="Преподаватель" />
                    <datalist id="teachers">
                        <option value="">
                            {
                                props.teachers && props.teachers.map(
                                    (item) => {
                                        return <option value={item.fullname} key={item.id_teacher} />
                                    }
                                )
                            }
                        </option>
                    </datalist>

                    <input className={st.form_input} disabled={disable} type="text" name="room" id="" placeholder="Кабинет" maxLength={7} />

                    <label htmlFor="">
                        <input className={st.form_input} disabled={disable} type="radio" name="is_exam" />
                        <p>Экзамен</p>
                    </label>

                    <label htmlFor="">
                        <input className={st.form_input} disabled={disable} type="radio" name="is_cancel" />
                        <p>Отменена (электронная пара)</p>
                    </label>

                    <PrevSchedule date={props.date} number_lesson={props.index + 1} setOpen={setOpen} disabled={disable} setDisable={setDisable} />

                    <button disabled={disable} type="submit" className={st.form_btn}>
                        <PluseIcon className={st.form_icon} />
                        <span className={st.form_span}>Отправить</span>
                    </button>

                </form>

            </Modal>
        </>
    );
}

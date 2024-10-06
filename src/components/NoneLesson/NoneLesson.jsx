import React, { useEffect, useState } from "react";

import st from "./style.module.css";

import { ReactComponent as PluseIcon } from "../../pic/pluse_icon.svg";
import Modal from "../Modal/Modal";
import { BASE } from "../../services/vars";

export default function NoneLesson(props) {

    let [open, setOpen] = useState(false);

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
            room: e.target.room.value.trim()
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

                    <input list="lessons" name="lesson" className={st.form_input} type="text" placeholder="Пара" />
                    <datalist id="lessons">
                        {

                            props.lessons && props.lessons.map(
                                (item) => {
                                    return <option value={item.name_lesson} key={item.id_lesson} />
                                }
                            )

                        }
                    </datalist>

                    <input list="teachers" name="teacher" className={st.form_input} type="text" placeholder="Преподаватель" />
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

                    <input className={st.form_input} type="text" name="room" id="" placeholder="Кабинет" maxLength={7} />

                    <button type="submit" className={st.form_btn}>
                        <PluseIcon className={st.form_icon} />
                        <span className={st.form_span}>Отправить</span>
                    </button>

                </form>

            </Modal>
        </>
    );
}

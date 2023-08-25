import React, {useState, useEffect} from 'react';

import st from "./style.module.css";

import { ReactComponent as EditIcon } from "../../pic/edit_icon.svg";
import { ReactComponent as DeleteIcon } from "../../pic/delete_icon.svg";
import { ReactComponent as PluseIcon } from "../../pic/pluse_icon.svg";

import Modal from '../Modal/Modal';

export default function Lesson(props) {

    useEffect(() => {
        console.log("Lessons: ", props.lessons);
        console.log("Lesson: ", props.lesson);
        console.log("Teachers: ", props.teachers);
        console.log("Index: ", props.index);
        console.log("Date: ", props.date);
    })

    let [open, setOpen] = useState(false);

    let handlerDelete = (e) => {

        fetch(`http://localhost:8080/api/schedule?id=${props.lesson.id_schedule}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(data => data.json())
            .then(json => {
                console.log(json);
                props.changeDate(new Date(props.date));
            })

    }

    let handlerSubmit = (e) => {
        e.preventDefault();

        if (e.target.lesson.value === "" || e.target.teacher.value === "" || e.target.room.value === "") {
            alert("Есть пустоты");
            return true;
        }


        let data = {
            id_schedule: props.lesson.id_schedule, 
            name_lesson: e.target.lesson.value, 
            room: e.target.room.value, 
            fullname_teacher: e.target.teacher.value
        }

        console.log(data);

        fetch("http://localhost:8080/api/schedule", {
            method: 'PUT',
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
            .catch(
                (err) => {
                    console.log(err);
                }
            )

    };

    return (
        <>
            <div className={st.lesson}>

                <div className={st.info}>
                    <h2 className={st.info_lesson}>{props.lesson.name_lesson}</h2>
                    <p className={st.info_teacher}>{props.lesson.teacher}</p>
                    <p className={st.info_room}>Аудитория: {props.lesson.room}</p>
                </div>

                <button className={st.btn} onClick={() => setOpen(true)}>
                    <EditIcon className={st.icon} />
                </button>

                <button className={st.btn} onClick={handlerDelete}>
                    <DeleteIcon className={st.icon} />
                </button>

            </div>
            <Modal open={open} onClose={() => setOpen(false)}>

                <h2 className={st.modal_header}>Изменить пару</h2>
                <form action="" onSubmit={handlerSubmit} className={st.form}>

                    <input list="lessons" name="lesson" defaultValue={props.lesson.name_lesson} className={st.form_input} type="text" placeholder="Пара" />
                    <datalist id="lessons">
                        {

                            props.lessons && props.lessons.map(
                                (item) => {
                                    return <option value={item.name_lesson} key={item.id_lesson} />
                                }
                            )

                        }
                    </datalist>

                    <input list="teachers" name="teacher" defaultValue={props.lesson.teacher} className={st.form_input} type="text" placeholder="Преподаватель" />
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

                    <input className={st.form_input} defaultValue={props.lesson.room} type="number" name="room" id="" placeholder="Кабинет" min={100} max={399} />

                    <button type="submit" className={st.form_btn}>
                        <PluseIcon className={st.form_icon} />
                        <span className={st.form_span}>Изменить</span>
                    </button>

                </form>

            </Modal>
        </>
    )
}

import React, { useEffect, useState } from "react";

import st from "./style.module.css";

import { ReactComponent as PluseIcon } from "../../pic/pluse_icon.svg";
import Modal from "../Modal/Modal";

export default function NoneLesson(props) {

    useEffect(() => {
        console.log("Lessons: ",props.lessons);
        console.log("Teachers: ",props.teachers);
    })

    let [open, setOpen] = useState(false);

    let handlerSubmit = (e) => {
        e.privetDefault();
        alert("submit form from Modal window");
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

                    <input list="lessons" className={st.form_input} type="text" placeholder="Пара" />
                    <datalist id="lessons">
                        {
                            
                            props.lessons && props.lessons.map(
                                (item) => {
                                    return <option value={item.name_lesson} key={item.id_lesson} />
                                }
                            )

                        }
                    </datalist>

                    <input list="teachers" className={st.form_input} type="text" placeholder="Преподаватель" />
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

                    <input className={st.form_input} type="number" name="" id="" placeholder="Кабинет" min={100} max={399} />

                    <button type="submit" className={st.form_btn}>
                        <PluseIcon className={st.form_icon} />
                        <span className={st.form_span}>Отправить</span>
                    </button>

                </form>

            </Modal>
        </>
    );
}

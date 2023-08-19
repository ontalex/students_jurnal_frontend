import React, { useState } from "react";

import st from "./style.module.css";

import { ReactComponent as PluseIcon } from "../../pic/pluse_icon.svg";
import Modal from "../Modal/Modal";

export default function NoneLesson(props) {

    let [open, setOpen] = useState(false);

    let fetchDate = (type) => {
        let data = [];

        fetch("http://localhost:8080/api/" + type).then(
            date => date.json()
        ).then(
            json => {
                data = JSON.parse(
                    JSON.stringify(json)
                )
                console.log(json);
            }
        )

        console.log(data);

        return data;
    }

    let handlerSubmit = (e) => {
        e.privetDefault();
        alert("submit form from Modal window");
    };

    return (
        <>
            <button className={st.btn} onClick={() => setOpen(true)}>

                <span>#{props.index + 1}</span>
                <PluseIcon className={st.btn_icon} />
                <p className={st.btn_span}>Пара</p>

            </button>

            <Modal open={open} onClose={() => setOpen(false)}>

                <h2 className={st.modal_header}>Создать пару</h2>
                <form action="" onSubmit={handlerSubmit} className={st.form}>

                    <input list="lessons" className={st.form_input} type="text" placeholder="Пара" />
                    <datalist id="lessons">
                        {
                            
                            fetchDate("lessons").map(
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
                                fetchDate("teachers").map(
                                    (item) => {
                                        return <option value={item.name_lesson} key={item.id_lesson} />
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

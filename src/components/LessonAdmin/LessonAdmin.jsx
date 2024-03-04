import React, { useState, useEffect, useCallback } from "react";

import st from "./style.module.css";

import { ReactComponent as EditIcon } from "../../pic/edit_icon.svg";
import { ReactComponent as DeleteIcon } from "../../pic/delete_icon.svg";
import { ReactComponent as PluseIcon } from "../../pic/pluse_icon.svg";

import Modal from "../Modal/Modal";

export default function Lesson(props) {
  useEffect(() => {
    console.log("Lessons: ", props.lessons);
    console.log("Lesson: ", props.lesson);
    console.log("Teachers: ", props.teachers);
    console.log("Index: ", props.index);
    console.log("Date: ", props.date);
  });

  let switchTimeLesson = useCallback(() => {
    switch (props.index + 1) {
        case 1:
            return "9:00 - 10:30";
        case 2:
            return "10:50 - 12:20";
        case 3:
            return "12:40 - 14:10";
        case 4:
            return "14:30 - 16:00";
        case 5:
            return "16:10 - 17:40";
    };
});

  let [openUpdate, setOpenUpdate] = useState(false);
  let [openDelete, setOpenDelete] = useState(false);

  let handlerDelete = (e) => {
    fetch(
      `https://ontalex.ru/alt/api/schedule?id=${props.lesson.id_schedule}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((data) => data.json())
      .then((json) => {
        props.changeDate(new Date(props.date));
      });
  };

  let handlerSubmit = (e) => {
    e.preventDefault();

    if (
      e.target.lesson.value === "" ||
      e.target.teacher.value === "" ||
      e.target.room.value === ""
    ) {
      alert("Есть пустоты");
      return true;
    }

    let data = {
      id_schedule: props.lesson.id_schedule,
      name_lesson: e.target.lesson.value,
      room: e.target.room.value.trim(),
      fullname_teacher: e.target.teacher.value,
    };

    console.log(data);

    fetch("https://ontalex.ru/alt/api/schedule", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((json) => {
        e.target.lesson.value = 0;
        e.target.teacher.value = 0;
        e.target.room.value = 0;

        props.changeDate(new Date(props.date));

        setOpenUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={st.lesson_wrapper}>
        <div className={st.lesson_about}>
            <p className={st.lesson_number}>Пара №{props.index + 1}</p>
            <p className={st.lesson_time}>{switchTimeLesson()}</p>
        </div>
        <div className={st.lesson}>
          <div className={st.info}>
            <h2 className={st.info_lesson}>{props.lesson.name_lesson}</h2>
            <p className={st.info_teacher}>{props.lesson.teacher}</p>
            <p className={st.info_room}>Аудитория: {props.lesson.room}</p>
          </div>

          <div className={st.info_edit_box}>
            <button className={st.btn} onClick={() => setOpenUpdate(true)}>
              <EditIcon className={st.icon} />
              <span>Изменить</span>
            </button>

            <button className={st.btn} onClick={() => setOpenDelete(true)}>
              <DeleteIcon className={st.icon} />
              <span>Удалить</span>
            </button>
          </div>
        </div>
      </div>

      <Modal open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <h2 className={st.modal_header}>Изменить пару</h2>
        <form action="" onSubmit={handlerSubmit} className={st.form}>
          <input
            list="lessons"
            name="lesson"
            defaultValue={props.lesson.name_lesson}
            className={st.form_input}
            type="text"
            placeholder="Пара"
          />
          <datalist id="lessons">
            {props.lessons &&
              props.lessons.map((item) => {
                return <option value={item.name_lesson} key={item.id_lesson} />;
              })}
          </datalist>

          <input
            list="teachers"
            name="teacher"
            defaultValue={props.lesson.teacher}
            className={st.form_input}
            type="text"
            placeholder="Преподаватель"
          />
          <datalist id="teachers">
            <option value="">
              {props.teachers &&
                props.teachers.map((item) => {
                  return <option value={item.fullname} key={item.id_teacher} />;
                })}
            </option>
          </datalist>

          <input
            className={st.form_input}
            defaultValue={props.lesson.room.trim()}
            type="text"
            name="room"
            id=""
            placeholder="Кабинет"
            minLength={3}
            maxLength={7}
          />

          <button type="submit" className={st.form_btn}>
            <PluseIcon className={st.form_icon} />
            <span className={st.form_span}>Изменить</span>
          </button>
        </form>
      </Modal>

      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <h2 className={st.modal_header}>Вы действильно хотите удалить пару?</h2>

        <p className={st.modal_desc}>
          Это вызовет удаление связанных отметок посещаемости
        </p>

        <button
          className={[st.form_btn, st.delete_button].join(" ")}
          onClick={handlerDelete}
        >
          <DeleteIcon className={st.icon} />
          <span className={st.form_span}>Удалить</span>
        </button>
      </Modal>
    </>
  );
}

import { useMutation } from "react-query";
import Lesson from "../../components/LessonUser/LessonUser";
import InputDate from "../../components/inputDate/InputDate";
import "./User.css";

import React, { useEffect, useState } from "react";
import { getDaySchedule } from "../../services/schedule.service";
import PopapLoading from "../../components/PopapLoading/PopapLoading";
import PopapError from "../../components/PopapError/PopapError";

export default function User() {
    let [date, setDate] = useState(new Date());
    let [list, setList] = useState([]);

    useEffect(() => mutate( date ), [date]);

    let { mutate, isLoading, isError } = useMutation({
        mutationFn: (data) => getDaySchedule(data),
        onSettled: (json) => {
            console.clear();
            console.log(json);
            setList(json);
        },
    });

    return (
        <div className="user_page">
            <div className="user_container">
                <InputDate date={date} changeDate={setDate} />
                {isLoading && <PopapLoading/>}
                {isError && <PopapError/>}
                <div className="user_list">
                    {Boolean(list.length) ? (
                        list.map((item) => {
                            return <Lesson lesson={item} />;
                        })
                    ) : (
                        <p className="user_none">Нету пар</p>
                    )}
                </div>
            </div>
        </div>
    );
}

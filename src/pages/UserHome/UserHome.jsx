import { useMutation } from "react-query";
import Lesson from "../../components/LessonUser/LessonUser";
import InputDate from "../../components/inputDate/InputDate.jsx";
import "./UserHome.css";

import React, { useEffect, useState } from "react";
import { getDaySchedule } from "../../services/schedule.service";
import PopapLoading from "../../components/PopapLoading/PopapLoading";
import PopapError from "../../components/PopapError/PopapError";
import useFormateLessons from "../../hooks/useFormateLessons.js";

export default function UserHome() {
    let [date, setDate] = useState(new Date());
    let [list, setList] = useState([]);

    useEffect(() => mutate(date), [date]);

    let { mutate, isLoading, isError } = useMutation({
        mutationFn: (data) => getDaySchedule(data),
        // eslint-disable-next-line react-hooks/rules-of-hooks
        onSettled: (json) => useFormateLessons(json, setList)
    });
    return (
        <>
            <InputDate date={date} changeDate={setDate} />

            {isLoading && <PopapLoading />}
            {isError && <PopapError />}
            
            <div className="user_list">
            
                {          
                    list.map((lesson, index) => {
                        
                        return <Lesson lesson={lesson} numberLesson={index + 1} />
                    })
                }

            </div>

        </>
    )

}
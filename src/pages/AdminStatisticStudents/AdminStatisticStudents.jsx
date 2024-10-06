import React, { useState } from 'react';
import st from "./st.module.css";
import InputDate from '../../components/inputDate/InputDate';

export default function AdminStatisticStudents() {

        let [dateStart, setDateStart] = useState(
                new Date().toISOString().split("T")[0]
        );
        let [dateStop, setDateStop] = useState(
                new Date().toISOString().split("T")[0]
        );

        return (
                <div className={st.page}>
                        <InputDate date={dateStart} changeDate={setDateStart} />
                        <InputDate date={dateStart} changeDate={setDateStop} />

                        <Inp
                </div>
        )
}

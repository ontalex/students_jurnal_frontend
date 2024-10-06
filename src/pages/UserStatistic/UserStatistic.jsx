import React, { useEffect, useState } from 'react';
import InputDate from '../../components/inputDate/InputDate.jsx';
import { useMutation } from "react-query";
import st from "./style.module.css";
import { getCountLessons } from '../../services/stutistic.service';
import GridStatisticLessons from '../../components/GridStatisticLessons/GridStatisticLessons';

const UserStatistic = () => {
        let [dateStart, setDateStart] = useState(
                new Date().toISOString().split("T")[0]
        );
        let [dateEnd, setDateEnd] = useState(
                new Date().toISOString().split("T")[0]
        );

        function getState(dateStart, dateEnd) {
                let body = {
                        date_begin: dateStart,
                        date_end: dateEnd
                };

                statistic.mutateAsync(body);
        }

        useEffect(() => getState(dateStart, dateEnd), []);

        let statistic = useMutation({
                mutationFn: (body) => getCountLessons(body)
        });

        return (
                <>

                        <InputDate changeDate={setDateStart} date={dateStart} />
                        <InputDate changeDate={setDateEnd} date={dateEnd} />

                        <button className={st.btn} onClick={() => getState(dateStart, dateEnd)}>
                                Получить
                        </button>

                        <GridStatisticLessons
                                data={statistic.data}
                                loader={statistic.isLoading}
                        />

                </>
        )
};

export default UserStatistic;

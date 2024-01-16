import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BASE } from '../../services/auth.service';
import PopapLoading from '../../components/PopapLoading/PopapLoading';
import PopapError from '../../components/PopapError/PopapError';

import st from "./style.module.css";

export const Share = () => {

        let token = useParams().short_token || null;

        const fetchGetLogs = async () => {

                const response = await fetch(`${BASE}/share/logbook`, {
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                                "token": token
                        }
                });
                return response.json();
        };

        const { data, status } = useQuery('logsShare', fetchGetLogs);

        if (!token) {
                return <div>
                        <h1>У вас нету ключа доступа</h1>
                </div>
        } else if (status === 'loading') {
                return <PopapLoading />;
        } else if (status === 'error' || data.message === "Error!" || data.type === "Error") {
                return <PopapError />;
        } else {
                return (
                        <div className={st.share_page}>
                                <p>Дата: {data.date_lesson}</p>
                                <p>Пара: {data.name_lesson}</p>
                                <p>№ пары: {data.number_lesson}</p>

                                <table className={st.table} cellSpacing={0}>
                                        <thead className={st.table_head}>
                                                <tr>
                                                        <th>Студент</th>
                                                        <th>Статус</th>
                                                </tr>
                                        </thead>
                                        <tbody className={st.table_body}>
                                                {
                                                        data?.logs.map(log => <tr>
                                                                <td>{log.full_name}</td>
                                                                <td className={log.type_log.includes("Присутствует") ? st.log_has : st.log_none}>{log.type_log}</td>
                                                        </tr>)
                                                }
                                        </tbody>
                                </table>
                        </div>
                )
        }
}

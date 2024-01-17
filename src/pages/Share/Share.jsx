import React, { ReactComponent } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BASE } from '../../services/auth.service';
import PopapLoading from '../../components/PopapLoading/PopapLoading';
import PopapError from '../../components/PopapError/PopapError';

import st from "./style.module.css";

import { ReactComponent as CaretRight } from '../../pic/caret_right.svg';
import { ShareParam } from '../../components/ShareParam/ShareParam';

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
                        <div className={st.content}>

                                <NavLink
                                        to={"/"}
                                        className={st.link_back}
                                >
                                        <CaretRight className={st.caret} />
                                        <span className={st.link_span}>На главную</span>
                                </NavLink>

                                <div className={st.data_lesson}>
                                        <ShareParam value={data.date_lesson} name={"Дата"} />
                                        <ShareParam value={data.name_lesson} name={"Предмет"} />
                                        <ShareParam value={data.number_lesson} name={"Номер пары"} />
                                </div>

                                <table className={st.table} cellSpacing={0}>
                                        <thead className={st.table_head}>
                                                <tr>
                                                        <th>Студент</th>
                                                        <th>Статус</th>
                                                </tr>
                                        </thead>
                                        <tbody className={st.table_body}>
                                                {
                                                        data?.logs.map(log => <tr className={st.table_body_tr}>
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

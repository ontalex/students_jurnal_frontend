import React, { useCallback, useState } from "react";
import "./AdminExport.css";
import { useMutation } from "react-query";
import { getPeriodReport } from "../../services/order.service";

export default function AdminExport() {
    let [dateStart, setDateStart] = useState(
        new Date().toISOString().split("T")[0]
    );
    let [dateStop, setDateStop] = useState(
        new Date().toISOString().split("T")[0]
    );

    let orderReq = useMutation({
        mutationFn: (bodyReq) => getPeriodReport(bodyReq),
        onSuccess: (data) => {
            console.table(
                data.students.map((item) => {
                    return item.logs;
                })
            );
        },
    });

    let handlerSubmit = useCallback(
        (e) => {
            e.preventDefault();
            orderReq.mutate({
                start_date: new Date(dateStart).toISOString().split("T")[0],
                end_date: new Date(dateStop).toISOString().split("T")[0],
            });
        },
        [dateStart, dateStop]
    );

    return (
        <div className="export">
            <h1>Создание Отчётов</h1>

            <p>
                Сдесь вы можите создать отчёт по посещвемости за нужный вам срок
                (учтите, процесс создания может занять некоторое время)
            </p>

            <form onSubmit={handlerSubmit}>
                <div className="export__box">
                    <input
                        className="export__input"
                        onSubmit={(e) => e.preventDefault()}
                        type="date"
                        name="date_start"
                        id="date_start"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDateStart(e.target.value)}
                    />
                </div>
                <div className="export__box">
                    <input
                        className="export__input"
                        onSubmit={(e) => e.preventDefault()}
                        type="date"
                        name="date_end"
                        id="date_end"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDateStop(e.target.value)}
                    />
                </div>
                <button className="export_getReq">
                    <span>Получить данные</span>
                </button>
            </form>

            {orderReq.isLoading && <p>Загрузка данных...</p>}
            {orderReq.isError && <p>Ошибка загрузки!</p>}

            {Boolean(orderReq.data) ? (
                <div className="export_container">
                    <table className="export_table">
                        <caption>
                            Отчёт с {orderReq.data.date_start} по{" "}
                            {orderReq.data.date_end}
                        </caption>
                        <thead>
                            <tr>
                                <th rowSpan={2}>ФИО</th>
                                {orderReq.data.lessons.map((item) => (
                                    <th className="table_namelesson">
                                        {item.lesson_name}
                                    </th>
                                ))}
                                <th rowSpan={2}>Опозд.</th>
                                <th rowSpan={2}>НП</th>
                                <th rowSpan={2}>УП</th>
                                <th rowSpan={2}>ВСЕГО Академ Часов</th>
                            </tr>
                            <tr>
                                {orderReq.data.lessons.map((item) => (
                                    <th>{item.lesson_number}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orderReq.data.students.map((item) => (
                                <tr>
                                    <td>{item.student_fullname}</td>
                                    {item.logs.map((item) => (
                                        <td>{item}</td>
                                    ))}
                                    <td>{item.total.delays}</td>
                                    <td>{item.total.disrespectful}</td>
                                    <td>{item.total.respectfully}</td>
                                    <td>
                                        {item.total.respectfully +
                                            item.total.disrespectful}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Здесь будет ваша таблица...</p>
            )}
        </div>
    );
}

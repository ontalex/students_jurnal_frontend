import React from 'react';

export default function MaxOrder({ orderReq }) {

        if (Boolean(orderReq.date_start)) {
                return (
                        <>
                                <caption>
                                        Отчёт с {orderReq?.date_start} по {orderReq?.date_end}
                                </caption>
                                <thead>
                                        <tr>
                                                <th rowSpan={3}>ИСП-321</th>
                                                {orderReq?.lessons.map((item) => (
                                                        <th>
                                                                {new Date(
                                                                        item.lesson_date
                                                                ).toLocaleDateString("ru", {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                })}
                                                        </th>
                                                ))}
                                                <th rowSpan={3}>Опоздания</th>
                                                <th rowSpan={3}>НУ (по уважительной)</th>
                                                <th rowSpan={3}>Н (по не уважительной)</th>
                                                <th rowSpan={3}>НБ (по болезни)</th>
                                                <th rowSpan={3}>Всего академических часов</th>
                                        </tr>
                                        <tr>
                                                {orderReq?.lessons.map((item) => (
                                                        <th style={{ maxWidth: "200px" }}>
                                                                {item.lesson_name}
                                                        </th>
                                                ))}
                                        </tr>
                                        <tr>
                                                {orderReq?.lessons.map((item) => (
                                                        <th>{item.lesson_number}</th>
                                                ))}
                                        </tr>
                                </thead>
                                <tbody>
                                        {orderReq?.students.map((item) => (
                                                <tr>
                                                        <td style={{ width: "300px" }}>
                                                                {item.student_fullname}
                                                        </td>
                                                        {item.logs.map((item) => (
                                                                <td>{item || " "}</td>
                                                        ))}
                                                        <td>{item.total.delays}</td>
                                                        <td>{item.total.respectfully}</td>
                                                        <td>{item.total.disrespectful}</td>
                                                        <td>{item.total.disease}</td>
                                                        <td>
                                                                {item.total.respectfully +
                                                                        item.total.disrespectful +
                                                                        item.total.disease}
                                                        </td>
                                                </tr>
                                        ))}
                                </tbody>
                                <tfoot>
                                        <tr>
                                                <th>Куратор</th>
                                                <td colSpan={4}>Полтева В. С.</td>
                                                <td colSpan={3}> </td>
                                        </tr>
                                        <tr>
                                                <th>Староста</th>
                                                <td colSpan={4}>Борисов А. О.</td>
                                                <td colSpan={3}> </td>
                                        </tr>
                                </tfoot>
                        </>
                )
        }
        else {
                return (<>FALSE</>)
        }
}

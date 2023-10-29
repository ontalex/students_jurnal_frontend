import React from 'react'

export default function MinOrder({ orderReq }) {
        if (Boolean(orderReq.date_start)) {
                return (
                        <>
                                <caption>
                                        Отчёт с {orderReq?.date_start} по {orderReq?.date_end}
                                </caption>
                                <thead>
                                        <tr>
                                                <th rowSpan={1}>ИСП-321</th>
                                                <th rowSpan={1}>Опозд.</th>
                                                <th rowSpan={1}>УП</th>
                                                <th rowSpan={1}>НП</th>
                                                <th rowSpan={1}>ОБ</th>
                                                <th rowSpan={1}>ВСЕГО Академ Часов</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {orderReq?.students.map((item) => (
                                                <tr>
                                                        <td style={{ width: "300px" }}>
                                                                {item.student_fullname}
                                                        </td>
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
                                                <td colSpan={3}>Полтева В. С.</td>
                                                <td colSpan={2}> </td>
                                        </tr>
                                        <tr>
                                                <th>Староста</th>
                                                <td colSpan={3}>Борисов А. О.</td>
                                                <td colSpan={2}> </td>
                                        </tr>
                                </tfoot>
                        </>
                )
        }
        else {
                return (<>FALSE</>)
        }
}

import React, { useCallback, useRef, useState } from "react";
import "./AdminExport.css";
import { useMutation } from "react-query";
import { getPeriodReport } from "../../services/order.service";

export default function AdminExport() {
    let refTable = useRef(null);
    let [dateStart, setDateStart] = useState(
        new Date().toISOString().split("T")[0]
    );
    let [dateStop, setDateStop] = useState(
        new Date().toISOString().split("T")[0]
    );

    let getFile = (data) => {
        let link = document.createElement("a");
        link.download = `report_${orderReq.data.date_start}_${orderReq.data.date_end}.xls`;

        let blob = new Blob(
            [
                `<htmlxmlns:o="urn:schemas-microsoft-com:office:office"xmlns:x="urn:schemas-microsoft-com:office:excel"xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>2023-10-02 - 2023-10-08</x:Name><x:WorksheetOptions><x:DisplayGridlines /></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table border="2">${data}</table></body></html>`,
            ],
            { type: "application/vnd.ms-excel" }
        );

        link.href = URL.createObjectURL(blob);

        link.click();

        URL.revokeObjectURL(link.href);
    };

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
                <>
                    <div className="export_container">
                        <table cellSpacing={0} border={2} ref={refTable}>
                            <caption>
                                Отчёт с {orderReq.data.date_start} по{" "}
                                {orderReq.data.date_end}
                            </caption>
                            <thead>
                                <tr>
                                    <th rowSpan={3}>ИСП-321</th>
                                    {orderReq.data.lessons.map((item) => (
                                        <th>
                                            {new Date(
                                                item.lesson_date
                                            ).toLocaleDateString("ru", {
                                                day: "2-digit",
                                                month: "2-digit",
                                            })}
                                        </th>
                                    ))}
                                    <th rowSpan={3}>Опозд.</th>
                                    <th rowSpan={3}>НП</th>
                                    <th rowSpan={3}>УП</th>
                                    <th rowSpan={3}>БП</th>
                                    <th rowSpan={3}>ВСЕГО Академ Часов</th>
                                </tr>
                                <tr>
                                    {orderReq.data.lessons.map((item) => (
                                        <th style={{ maxWidth: "200px" }}>
                                            {item.lesson_name}
                                        </th>
                                    ))}
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
                                        <td style={{ width: "300px" }}>
                                            {item.student_fullname}
                                        </td>
                                        {item.logs.map((item) => (
                                            <td>{item || " "}</td>
                                        ))}
                                        <td>{item.total.delays}</td>
                                        <td>{item.total.disrespectful}</td>
                                        <td>{item.total.respectfully}</td>
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
                        </table>
                    </div>

                    <button
                        className="export_getReq"
                        onClick={() => getFile(refTable.current.innerHTML)}
                    >
                        Скачать XLS
                    </button>
                </>
            ) : (
                <p>Здесь будет ваша таблица...</p>
            )}
        </div>
    );
}

import React, { useCallback, useRef, useState } from "react";
import "./AdminExport.css";
import { useMutation } from "react-query";
import { getPeriodReport } from "../../services/order.service";
import MaxOrder from "../../components/MaxOrder/MaxOrder";
import MinOrder from "../../components/MinOrder/MinOrder";
import PopapLoading from "../../components/PopapLoading/PopapLoading";
import PopapError from "../../components/PopapError/PopapError";

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

    let [type, setType] = useState("max");
    let [data, setData] = useState({});

    let orderReq = useMutation({
        mutationFn: (bodyReq) => getPeriodReport(bodyReq, type),
        onSuccess: (value) => {
            setData(value)
        }
    });

    let handlerSubmit = useCallback(
        (e) => {
            e.preventDefault();
            orderReq.mutate({
                start_date: new Date(dateStart).toISOString().split("T")[0],
                end_date: new Date(dateStop).toISOString().split("T")[0],
            });
        },
        [dateStart, dateStop, type]
    );

    return (
        <div className="export">

            <form onSubmit={handlerSubmit}>
                <label className="export__box">
                    <span>Начальная дата</span>
                    <input
                        className="export__input"
                        onSubmit={(e) => e.preventDefault()}
                        type="date"
                        name="date_start"
                        id="date_start"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDateStart(e.target.value)}
                    />
                </label>
                <label className="export__box">
                    <span>Конечная дата</span>
                    <input
                        className="export__input"
                        onSubmit={(e) => e.preventDefault()}
                        type="date"
                        name="date_end"
                        id="date_end"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDateStop(e.target.value)}
                    />
                </label>
                <label className="export__minbox" htmlFor="typeOrderId">
                    <p>Минимальный отчёт</p>
                    <input
                        className="export__check"
                        onChange={(e) => {
                            setData({})
                            setType(e.target.checked ? "min" : "max");
                        }}
                        type="checkbox"
                        name="typeOrder"
                        id="typeOrderId"
                    />
                    <div className="export__checkbox"></div>
                </label>
                <button className="export_getReq">
                    <span>Получить данные</span>
                </button>
            </form>

            {orderReq.isLoading && <PopapLoading />}
            {orderReq.isError && <PopapError />}

            {Boolean(data.students) ? (
                <>
                    <React.Suspense fallback={<PopapLoading />}>
                        <button
                            className="export_getReq"
                            onClick={() => getFile(refTable.current.innerHTML)}
                        >
                            Скачать XLS
                        </button>
                        <div className="export_container">
                            <table cellSpacing={0} ref={refTable}>
                                {type === "min" ? (
                                    <MinOrder orderReq={data} />
                                ) : (
                                    <MaxOrder orderReq={data} />
                                )}
                            </table>
                        </div>

                    </React.Suspense>
                </>
            ) : (
                <p>Здесь будет ваша таблица...</p>
            )}
        </div>
    );
}

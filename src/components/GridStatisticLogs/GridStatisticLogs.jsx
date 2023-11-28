import React from 'react';
import st from "./style.module.css";
const GridTable = ({ data }, children) => {
        /**
         * data - данные по одному типу
         * children - Название типа для отображения
        */

        let showItems = (itemsObject) => {
                // itemsObject - массив значений для таблиц
                return (
                        <table>
                                {
                                        itemsObject.map(
                                                item => {
                                                        return (
                                                                <tr>
                                                                        <td>{item.name_lesson}</td>
                                                                        <td>{item.count}</td>
                                                                </tr>
                                                        )
                                                }
                                        )
                                }
                        </table>
                )
        };

        return (
                <article>
                        <h1>{children}</h1>
                        <div className={st.article_body}>
                                {
                                        Boolean(Object.keys(data) > 0) ?
                                                showItems(data) :
                                                <p>Нету данных</p>
                                }
                        </div>
                </article>
        )
}

export const GridStatisticLogs = ({ data, loader }) => {
        return (
                <div className={st.grid}>

                        <GridTable data={data["n"]}>Неувательно</GridTable>
                        <GridTable data={data["nb"]}>По болезни</GridTable>
                        <GridTable data={data["nu"]}>Уважительные</GridTable>
                        <GridTable data={data["o"]}>Опоздания</GridTable>

                </div>
        )
}

import React, { useEffect } from "react";
import * as rq from "react-query";
import * as indiService from "../../services/individual.service";
import PopapLoading from "../../components/PopapLoading/PopapLoading";
import PopapError from "../../components/PopapError/PopapError";

import st from './style.module.css';

export default function AdminIndividual() {
    // мутант на обновление списка
    const mutationGet = rq.useMutation({
        mutationFn: async () => await indiService.getIndividuals(),
    })

    // мутант на добавление данных


    // мутант на изменение данных
    // мутант на удаление данных

    // состояние на окно добавления

    useEffect(() => {
        mutationGet.mutate()
    }, [])


    return (<>
        <button onClick={() => mutationGet.mutate()} className={st.btn}>
            <span>Обновить</span>
        </button >

        {mutationGet.isLoading && <PopapLoading />}
        {mutationGet.isError && <PopapError />}
        {Boolean(mutationGet.data?.length > 0) ? <div>
            {mutationGet.data?.map(item => {
                return <div className={st.item}>
                    <div className={st.item__box}>
                        <p className={st.item__fullname}>{item.fullname}</p>
                        <div className={st.item__diapason}>
                            <p className={st.item__time}>{new Date(item.date_start).toLocaleDateString("ru")}</p>
                            <span>-</span>
                            <p className={st.item__time}>{new Date(item.date_end).toLocaleDateString("ru")}</p>
                        </div>
                    </div>
                    <div className={st.btns_box}>
                        <button className={st.btn}><span>Изменить</span></button>
                        <button className={st.btn}><span>Удалить</span></button>
                    </div>
                </div>
            })}
        </div> : <p>Нету данных</p>}
    </>)
}
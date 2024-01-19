import React, { useEffect } from 'react';
import st from "./style.module.css";

export const YandexShare = (props) => {

        useEffect(() => {
                window.Ya.share2('ya', {
                        theme: { 
                                services: '',
                                copy: "extraItem",
                                "data-size": "l"
                        },
                        content: { url: props.link }
                });
        }, [])

        return (
                <div id='ya' className={st.ya_share}></div>
        )
}

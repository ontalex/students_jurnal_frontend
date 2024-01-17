import React from 'react';

import st from "./style.module.css";

export const ShareParam = ({name, value}) => {
        return (
                <div className={st.box}>
                        <div className={st.box_name}>{name}</div>
                        <span className={st.box_value}>{value}</span>
                </div>
        )
}

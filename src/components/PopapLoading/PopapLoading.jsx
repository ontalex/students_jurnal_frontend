import React from "react";
import st from "./style.module.css";

export default function PopapLoading({ size = 48 }) {
    return (
        <div className={st.center}>
            <span className={st.loader} style={{ width: size + "px", height: size + "px" }}></span>
        </div>
    );
}

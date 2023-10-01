import React from "react";
import st from "./style.module.css";

export default function PopapError() {
    return (
        <p className={[st.user__alert, st.user__error].join(" ")}>
            что-то не так...
        </p>
    );
}

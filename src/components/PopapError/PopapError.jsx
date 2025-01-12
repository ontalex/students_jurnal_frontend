import React from "react";
import st from "./style.module.css";

export default function PopapError({ text }) {
    return (
        <p className={[st.user__alert, st.user__error].join(" ")}>
            {
                !text ? "что-то не так..." : text
            }
        </p>
    );
}

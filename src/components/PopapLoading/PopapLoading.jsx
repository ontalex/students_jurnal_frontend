import React from "react";
import st from "./style.module.css";

export default function PopapLoading() {
    return (
        <p className={[st.user__alert, st.user__loading].join(" ")}>
            загрузка...
        </p>
    );
}

import { BASE } from "./vars.js";

/**
 * 
 * @param {Object} body Тело запроса, передаваемое на сервервер
 * @param {String} typeOrder Необходимы тип отчёта (min\...)
 * @returns 
 */
export let getPeriodReport = async (body, typeOrder) => {
        let res = await fetch(`${BASE}/${typeOrder === "min" ? "min" : ""}order`, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token") || "",
                },
                body: JSON.stringify(body),
        });

        return !res.ok ? { status: "error" } : res.json();
};
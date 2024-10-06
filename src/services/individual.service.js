import { BASE } from "./vars.js";

export let getIndividuals = async () => {
    let res = await fetch(`${BASE}/individual/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        }
    });

    return !res.ok ? { status: "error" } : res.json()
}

export let postIndividual = async (fullname, date_start, date_end) => {
    let body = {
        fullname: fullname,
        date_start: date_start,
        date_end: date_end
    }
    let res = await fetch(`${BASE}/individual`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    return !res.ok ? { status: "error" } : res.json()
}
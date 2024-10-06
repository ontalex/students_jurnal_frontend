import { BASE } from "./vars.js";

export const pushState = async (data) => {

    let body = {
        id_student: data.id_student,
        id_lesson: data.id_lesson,
        type_log: data.type_log
    }

    let res = await fetch(BASE + "/logbook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    return !res.ok ? { status: "error" } : res.json()

}

export const updateLog = async (data) => {

    let body = {
        type_log: data.type_log,
        id: data.id
    }

    let res = await fetch(BASE + "/logbook", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    return !res.ok ? { status: "error" } : res.json()

}

export const getLogs = async (id_lesson, date_lesson) => {

    let body = {
        id_lesson: id_lesson,
        date_lesson: date_lesson
    }

    let res = await fetch(BASE + "/logbooks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    })

    return !res.ok ? { status: "error" } : res.json()

}

export const deleteLog = async (id_log) => {

    let res = await fetch(`${BASE}/logbook?id=${id_log}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        }
    })

    return !res.ok ? { status: "error" } : res.json()

}

export const getLog = async (id_log) => {

    let res = await fetch(`${BASE}/logbook?id=${id_log}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        }
    })

    return !res.ok ? { status: "error" } : res.json()

}
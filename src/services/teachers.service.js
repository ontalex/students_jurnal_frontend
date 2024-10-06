import { BASE } from "./vars.js";

export let addTeacher = async (fullname) => {
    let body = {
        "fullname": fullname
    }
    let res = await fetch(`${BASE}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    return !res.ok ? { status: "error" } : res.json()
}

export let getAllTeacher = async () => {
    let res = await fetch(`${BASE}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return !res.ok ? { status: "error" } : res.json()
}

export let getOneTeacher = async () => {
    let res = await fetch(`${BASE}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return !res.ok ? { status: "error" } : res.json()
}

export let deleteTeacher = async (id) => {
    let res = await fetch(`${BASE}/teacher?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        }
    });

    return !res.ok ? { status: "error" } : res.json()
}
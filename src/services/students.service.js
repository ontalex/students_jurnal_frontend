import { BASE } from "./vars.js";

export let newStudents = async ({ group_id, full_name, phone }) => {
    let body = {
        group_id: group_id,
        full_name: full_name,
        phone: phone,
    };
    let res = await fetch(`${BASE}/student`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(body),
    });

    return !res.ok ? { status: "error" } : res.json();
};

export let updateStudents = async ({ id_student, group_id, full_name, phone }) => {
    let body = {
        group_id: group_id,
        full_name: full_name,
        phone: phone,
    };

    let res = await fetch(`${BASE}/student?id=${id_student}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(body),
    });

    return !res.ok ? { status: "error" } : res.json();
};

export let getAllStudents = async () => {
    let res = await fetch(`${BASE}/students`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return !res.ok ? { status: "error" } : res.json();
};

export let getOneStudents = async (id_student) => {
    let res = await fetch(`${BASE}/student?id=${id_student}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return !res.ok ? { status: "error" } : res.json();
};

export let deleteStudents = async (id_student) => {
    let res = await fetch(`${BASE}/student?id=${id_student}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
        },
    });

    return !res.ok ? { status: "error" } : res.json();
};

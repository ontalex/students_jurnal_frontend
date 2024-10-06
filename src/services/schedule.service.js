import { BASE } from "./vars.js";

export const getDaySchedule = async (date) => {

    console.log(">> RQ +start -----------===----");

    let body = {
        date_lesson: date,
    };

    let res = await fetch(`${BASE}/schedule/day`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body),
    });

    return !res.ok ? { status: "error" } : res.json();
};

export const getAllSchedule = async () => {

    let res = await fetch(`${BASE}/schedules`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return !res.ok ? { status: "error" } : res.json();
};

export const getOneSchedule = async (id_schedule) => {

    let res = await fetch(`${BASE}/schedule?id=${id_schedule}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return !res.ok ? { status: "error" } : res.json();
};

export const addSchedule = async ({ date_lesson, number_lesson, name_lesson }) => {

    let body = {
        "date_lesson": date_lesson,
        "number_lesson": number_lesson,
        "name_lesson": name_lesson
    }

    let res = await fetch(`${BASE}/schedule`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    return !res.ok ? { status: "error" } : res.json();

}

export const deleteSchedule = async (id_schedule) => {

    let res = await fetch(`${BASE}/schedule?id=${id_schedule}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        }
    });

    return !res.ok ? { status: "error" } : res.json();

}

export const updateSchedule = async ({ fullname_teacher, id_schedule, name_lesson, room }) => {

    let body = {
        "id_schedule": id_schedule,
        "fullname_teacher": fullname_teacher,
        "name_lesson": name_lesson,
        "room": room
    }

    let res = await fetch(`${BASE}/schedule`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    return !res.ok ? { status: "error" } : res.json();

}
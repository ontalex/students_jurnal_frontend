let BASE = "http://localhost:8080/api";

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

    if (!res.ok) return {status: 'error'}

    return res.json()
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

    if (!res.ok) return {status: 'error'}

    return res.json()

} 

export const getLogs = async (id_lesson) => {

    let body = {
        id_lesson: id_lesson
    }

    let res = await fetch(BASE + "/logbooks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) return {status: 'error'}

    return res.json()
}
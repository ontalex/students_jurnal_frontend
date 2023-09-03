let BASE = "https://ontalex.ru/alt/api";

export let newLesson = async ({name_lesson, name_teacher}) => {
    let body = {
        name_lesson: name_lesson,
        name_teacher: name_teacher,
    };
    let res = await fetch(`${BASE}/lesson`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(body),
    });

    return !res.ok ? { status: "error" } : res.json();
};

export let updateLesson = async ({name_lesson, id_teacher, id_lesson}) => {
    let body = {
        name_lesson: name_lesson,
        id_teacher: id_teacher,
    };

    let res = await fetch(`${BASE}/lesson?id=${id_lesson}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(body),
    });

    return !res.ok ? { status: "error" } : res.json();
};

export let getAllLesson = async () => {
    let res = await fetch(`${BASE}/lessons`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return !res.ok ? { status: "error" } : res.json();
};

export let getOneLesson = async (id_lesson) => {
    let res = await fetch(`${BASE}/lesson?id=${id_lesson}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return !res.ok ? { status: "error" } : res.json();
};

export let deleteLesson = async (id_lesson) => {
    let res = await fetch(`${BASE}/lesson?id=${id_lesson}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
        },
    });

    return !res.ok ? { status: "error" } : res.json();
};

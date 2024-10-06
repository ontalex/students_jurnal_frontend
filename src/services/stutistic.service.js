import { BASE } from "./vars.js";

export let getStudentlogsBetween = async ({ student, begin_date, end_date }) => {
        let body = {
                "student_id": student,
                "begin_date": begin_date,
                "end_date": end_date
        }

        let res = await fetch(`${BASE}/statistics/logbookstudent/between`, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token") || ""
                },
                body: JSON.stringify(body)
        });

        return !res.ok ? { status: "error" } : res.json();
}

export let getCountLessons = async ({ date_begin, date_end }) => {
        let body = {
                date_begin: date_begin,
                date_end: date_end
        };

        let res = await fetch(`${BASE}/statistics/lessons/between`, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
        });

        return !res.ok ? { status: "error" } : res.json();
}
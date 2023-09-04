let BASE = "https://ontalex.ru/alt/api";

export let auth = async ({ login, password }) => {

    let body = {
        "login": login,
        "password": password
    }

    let res = await fetch(`${BASE}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return !res.ok ? { status: "error" } : res.json();

}

export let authCheck = async () => {

    let res = await fetch(`${BASE}/check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        }
    });

    return !res.ok ? { status: "error" } : res.json();

}

export let authUpdate = async ({ userID, login, password }) => {

    console.log(userID, login, password);

    let body = {
        userID: userID,
        login: login,
        password: password
    }

    console.log(JSON.stringify(body));

    let res = await fetch(BASE + "/user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    return !res.ok ? { status: "error" } : res.json();

}
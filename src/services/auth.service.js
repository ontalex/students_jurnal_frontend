let BASE = "http://localhost:8080/api/";

export let auth = async ({login, password}) => {
    
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
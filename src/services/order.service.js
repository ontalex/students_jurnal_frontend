let BASE = "https://ontalex.ru/alt/api";

export let getPeriodReport = async (body) => {
        let res = await fetch(`${BASE}/order`, {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token") || "",
                },
                body: JSON.stringify(body),
        });

        return !res.ok ? { status: "error" } : res.json();
};
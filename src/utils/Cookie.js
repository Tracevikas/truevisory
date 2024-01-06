import Cookies from "js-cookie";
export function setCookie(name, value, days) {
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        Cookies.set(name, value, { expires: date });
    }
    else
        Cookies.set(name, value);
}

export function getCookie(name) {
    const cookieData = Cookies && Cookies.get(name) || "";
    try {
        if (!cookieData || typeof (cookieData) === 'string') return cookieData || "";
        else {
            const result = JSON.parse(cookieData);
            return result;
        }
    } catch (e) {
        console.log("Cookies Exception - ", e);
        return "";
    }
}

export function removeCookie(name) {
    Cookies.remove(name);
}
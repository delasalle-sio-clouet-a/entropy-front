export function getCookie(name:string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}

export function deleteCookie(name:string) {
    const date = new Date();

    // définir la date d'expiration du cookie à hier (-1, donc il expire instantanément)
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}

export function writeCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // définir la durée du cookie à 1 jour
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}
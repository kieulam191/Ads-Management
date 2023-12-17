

export function getTS() {
    return Date.now();
}

export function convertTS(dateTime = Date()) {
    return new Date(dateTime).toISOString();
}

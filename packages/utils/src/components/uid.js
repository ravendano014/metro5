export default function UID(prefix = 'uid'){
    let d = new Date().getTime();
    return `${prefix}` + `-xxxx-xxxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
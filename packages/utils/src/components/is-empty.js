import isNull from "./is-null";

export default function isEmpty( obj ) {
    if (!isNull( obj )) {
        return false
    }
    if (typeof obj === "string" && obj.trim() !== "") {
        return false
    }
    if (typeof obj === "object") {
        for (let name in obj ) {
            if (obj.hasOwnProperty(name)) return false;
        }
    }
    return true;
}
import isArrayLike from "./is-array-like"

export default function random(from, to) {
    if (arguments.length === 1 && isArrayLike(from)) {
        return from[Math.floor(Math.random()*(from.length))];
    }
    return Math.floor(Math.random()*(to-from+1)+from);
}
import isDark from "./is-dark"

export default function isLight(color){
    return !isDark(color);
}
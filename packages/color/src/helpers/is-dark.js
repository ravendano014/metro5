import isColor from "./is-color";

export default function isDark(color){
    if (!isColor(color)) return;

    const rgb = toRGB(color);
    const YIQ = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

    return YIQ < 128;
}
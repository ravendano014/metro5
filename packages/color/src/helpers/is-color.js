import parse from "./parse";
import isHEX from "./is-hex";
import isRGB from "./is-rgb";
import isRGBA from "./is-rgba";
import isHSV from "./is-hsv";
import isHSL from "./is-hsl";
import isHSLA from "./is-hsla";
import isCMYK from "./is-cmyk";

export default function isColor(val){
    const color = parse(val);

    return !color ? false :
        isHEX(color) ||
        isRGB(color) ||
        isRGBA(color) ||
        isHSV(color) ||
        isHSL(color) ||
        isHSLA(color) ||
        isCMYK(color);
}
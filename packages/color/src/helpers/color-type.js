import Types from "../defines/color-types"
import isHEX from "./is-hex"
import isRGB from "./is-rgb";
import isRGBA from "./is-rgba";
import isHSV from "./is-hsv";
import isHSL from "./is-hsl";
import isHSLA from "./is-hsla";
import isCMYK from "./is-cmyk";

export default function colorType(color){
    if (isHEX(color)) return Types.HEX;
    if (isRGB(color)) return Types.RGB;
    if (isRGBA(color)) return Types.RGBA;
    if (isHSV(color)) return Types.HSV;
    if (isHSL(color)) return Types.HSL;
    if (isHSLA(color)) return Types.HSLA;
    if (isCMYK(color)) return Types.CMYK;

    return Types.UNKNOWN;
}
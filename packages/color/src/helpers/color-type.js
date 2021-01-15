import Types from "../defines/color-types"
import isHEX from "../check/is-hex"
import isRGB from "../check/is-rgb";
import isRGBA from "../check/is-rgba";
import isHSV from "../check/is-hsv";
import isHSL from "../check/is-hsl";
import isHSLA from "../check/is-hsla";
import isCMYK from "../check/is-cmyk";

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
import parse from "../helpers/parse";
import isRGB from "../check/is-rgb";
import isRGBA from "../check/is-rgba";
import RGB from "../primitives/rgb";
import isHSV from "../check/is-hsv";
import hsv2rgb from "./hsv-to-rgb";
import isHSL from "../check/is-hsl";
import hsl2hsv from "./hsl-to-hsv";
import isHSLA from "../check/is-hsla";
import isHEX from "../check/is-hex";
import hex2rgb from "./hex-to-rgb";
import isCMYK from "../check/is-cmyk";
import cmyk2rgb from "./cmyk-to-rgb";

export default function toRGB(val){
    let color = parse(val)

    if (isRGB(color)) return color;
    if (isRGBA(color)) return new RGB(color.r, color.g, color.b);
    if (isHSV(color)) return hsv2rgb(color);
    if (isHSL(color)) return hsv2rgb(hsl2hsv(color));
    if (isHSLA(color)) return hsv2rgb(hsl2hsv(color), color.a);
    if (isHEX(color)) return hex2rgb(color);
    if (isCMYK(color)) return cmyk2rgb(color);

    throw new Error("Unknown color format!");
}
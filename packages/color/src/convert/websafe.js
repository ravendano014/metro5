import parse from "../helpers/parse";
import isHEX from "../check/is-hex";
import isRGB from "../check/is-rgb";
import isRGBA from "../check/is-rgba";
import isHSV from "../check/is-hsv";
import isHSL from "../check/is-hsl";
import isCMYK from "../check/is-cmyk";
import hex2websafe from "./hex-to-websafe";
import rgb2websafe from "./rgb-to-websafe";
import hsv2websafe from "./hsv-to-websafe";
import hsl2websafe from "./hsl-to-websafe";
import cmyk2websafe from "./cmyk-to-websafe";
import isHSLA from "../check/is-hsla";

export default function websafe(color){
    let _color = parse(color)

    if (isHEX(_color)) return hex2websafe(_color);
    if (isRGB(_color)) return rgb2websafe(_color);
    if (isRGBA(_color)) return rgb2websafe(_color);
    if (isHSV(_color)) return hsv2websafe(_color);
    if (isHSL(_color)) return hsl2websafe(_color);
    if (isHSLA(_color)) return hsl2websafe(_color);
    if (isCMYK(_color)) return cmyk2websafe(_color);

    return _color;
}
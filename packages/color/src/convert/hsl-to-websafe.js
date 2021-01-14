import parse from "../helpers/parse";
import isHSL from "../check/is-hsl";
import isHSLA from "../check/is-hsla";
import hsv2hsl from "./hsv-to-hsl";
import rgb2hsv from "./rgb-to-hsv";
import rgb2websafe from "./rgb-to-websafe";
import {isNull} from "@metro5/utils";
import HSLA from "../primitives/hsla";

export default function hsl2websafe(color){
    let _color = parse(color)
    let alpha, res

    if (!isHSL(_color) && !isHSLA(_color)) {
        throw new Error("Argument is not a HSL or HSLA color")
    }

    if (isHSLA(_color)) {
        alpha = _color.a
    }

    res = hsv2hsl(rgb2hsv(rgb2websafe(toRGB(_color))));

    return isNull(alpha) ? res : new HSLA(res.h, res.s, res.l, alpha)
}
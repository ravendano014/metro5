import parse from "../helpers/parse"
import isHSV from "../check/is-hsv"
import HSL from "../primitives/hsl"
import {isNull} from "@metro5/utils"
import HSLA from "../primitives/hsla"

export default function hsv2hsl(color, alpha){
    let _color = parse(color);

    if (!isHSV(_color)) {
        throw new Error("Argument is not a HSV color")
    }

    let h, s, l, d

    h = _color.h
    l = (2 - _color.s) * _color.v
    s = _color.s * _color.v
    if (l === 0) {
        s = 0;
    } else {
        d = l <= 1 ? l : 2 - l
        if (d === 0) {
            s = 0
        } else {
            s /= d
        }
    }
    l /= 2

    return isNull(alpha) ? new HSL(h, s, l) : new HSLA(h, s, l, alpha);
}
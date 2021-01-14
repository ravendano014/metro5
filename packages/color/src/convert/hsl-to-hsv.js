import parse from "../helpers/parse";
import isHSL from "../check/is-hsl";
import isHSLA from "../check/is-hsla";
import HSV from "../primitives/hsv";

export default function hsl2hsv(color){
    let _color = parse(color)

    if (!isHSL(_color) && !isHSLA(_color)) {
        throw new Error("Argument is not a HSL or HSLA color")
    }

    let h, s, v, l;
    h = _color.h;
    l = _color.l * 2;
    s = _color.s * (l <= 1 ? l : 2 - l);

    v = (l + s) / 2;

    if (l + s === 0) {
        s = 0;
    } else {
        s = (2 * s) / (l + s);
    }

    return new HSV(h, s, v);
}
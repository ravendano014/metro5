import parse from "../helpers/parse";
import isRGB from "../check/is-rgb";
import isRGBA from "../check/is-rgba";
import HSV from "../primitives/hsv";

export default function rgb2hsv(color){
    let _color = parse(color);

    if (!isRGB(_color) && !isRGBA(_color)) {
        throw new Error("Argument is not a RGB or RGBA color")
    }

    let hsv = new HSV();
    let h, s, v;
    let r = _color.r / 255,
        g = _color.g / 255,
        b = _color.b / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let delta = max - min;

    v = max;

    if (max === 0) {
        s = 0;
    } else {
        s = 1 - min / max;
    }

    if (max === min) {
        h = 0;
    } else if (max === r && g >= b) {
        h = 60 * ((g - b) / delta);
    } else if (max === r && g < b) {
        h = 60 * ((g - b) / delta) + 360;
    } else if (max === g) {
        h = 60 * ((b - r) / delta) + 120;
    } else if (max === b) {
        h = 60 * ((r - g) / delta) + 240;
    } else {
        h = 0;
    }

    hsv.h = h;
    hsv.s = s;
    hsv.v = v;

    return hsv;
}
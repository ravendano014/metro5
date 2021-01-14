import parse from "../helpers/parse";
import isRGB from "../check/is-rgb";
import isRGBA from "../check/is-rgba";
import CMYK from "../primitives/cmyk";

export default function rgb2cmyk(color){
    let _color = parse(color);

    if (!isRGB(_color) || !isRGBA(_color)) {
        throw new Error("Argument is not a RGB or RGBA color")
    }

    let cmyk = new CMYK();

    let r = _color.r / 255, g = _color.g / 255, b = _color.b / 255
    let c, m, y, k

    k = Math.min(1 - r, 1 - g, 1 - b);

    c = 1 - k === 0 ? 0 : (1 - r - k) / (1 - k);
    m = 1 - k === 0 ? 0 : (1 - g - k) / (1 - k);
    y = 1 - k === 0 ? 0 : (1 - b - k) / (1 - k);

    cmyk.c = Math.round(c * 100);
    cmyk.m = Math.round(m * 100);
    cmyk.y = Math.round(y * 100);
    cmyk.k = Math.round(k * 100);

    return cmyk;
}
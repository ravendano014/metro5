import parse from "../helpers/parse";
import isCMYK from "../check/is-cmyk";
import RGB from "../primitives/rgb";
import {isNull} from "@metro5/utils";
import RGBA from "../primitives/rgba";

export default function cmyk2rgb(color, alpha){
    let _color = parse(color)

    if (!isCMYK(_color)) {
        throw new Error("Argument is not a CMYK color")
    }

    let r = Math.floor(255 * (1 - _color.c / 100) * (1 - _color.k / 100));
    let g = Math.ceil(255 * (1 - _color.m / 100) * (1 - _color.k / 100));
    let b = Math.ceil(255 * (1 - _color.y / 100) * (1 - _color.k / 100));

    return isNull(alpha) ? new RGB(r, g, b) : new RGBA(r, g, b, alpha);
}
import expandHexColor from "../helpers/expand-hex"
import RGB from "../primitives/rgb"
import {isNull} from "@metro5/utils"
import RGBA from "../primitives/rgba"
import parse from "../helpers/parse";
import isHEX from "../check/is-hex";

export default function hex2rgb(color, alpha){
    let _color = parse(color)

    if (!isHEX(_color)) {
        throw new Error("Argument is not a HEX color")
    }

    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_color);

    if (isNull(res)) {
        throw new Error("Argument is not a HEX color")
    }

    let r = parseInt(res[1], 16)
    let g = parseInt(res[2], 16)
    let b = parseInt(res[3], 16)

    return isNull(alpha) ? new RGB(r, g, b) : new RGBA(r, g, b, alpha)
}
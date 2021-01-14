import parse from "../helpers/parse"
import isRGB from "../check/is-rgb"
import isRGBA from "../check/is-rgba"
import RGB from "../primitives/rgb";
import RGBA from "../primitives/rgba";

export default function rgb2websafe(color){
    let _color = parse(color)
    let alpha

    if (!isRGB(_color) && !isRGBA(_color)) {
        throw new Error("Argument is not a RGB or RGBA color")
    }

    let r, g, b

    r = Math.round(_color.r / 51) * 51
    g = Math.round(_color.g / 51) * 51
    b = Math.round(_color.b / 51) * 51

    return isRGB(_color) ? new RGB(r, g, b) : new RGBA(r, g, b, _color.a)
}
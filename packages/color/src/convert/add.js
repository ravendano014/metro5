import isColor from "../check/is-color";
import toRGBA from "./to-rgba";
import RGBA from "../primitives/rgba";
import toColor from "./to-color";

export default function add(val1, val2, returnAs){
    let color1 = parse(val1)
    let color2 = parse(val2)

    if (!isColor(color1) || !isColor(color2)) {
        throw new Error("Unknown color format!")
    }

    let c1 = toRGBA(color1)
    let c2 = toRGBA(color2)
    let result = new RGBA()
    let to = (""+returnAs).toLowerCase() || "hex"

    result.r = Math.round((c1.r + c2.r) / 2)
    result.g = Math.round((c1.g + c2.g) / 2)
    result.b = Math.round((c1.b + c2.b) / 2)
    result.a = Math.round((c1.a + c2.a) / 2)

    return toColor(result, to, result.a)
}
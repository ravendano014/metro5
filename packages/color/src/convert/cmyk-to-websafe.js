import parse from "../helpers/parse"
import isCMYK from "../check/is-cmyk"
import rgb2cmyk from "./rgb-to-cmyk"
import rgb2websafe from "./rgb-to-websafe"
import cmyk2rgb from "./cmyk-to-rgb"

export default function cmyk2websafe(color){
    let _color = parse(color)

    if (!isCMYK(_color)) {
        throw new Error("Argument is not a CMYK color")
    }

    return rgb2cmyk(rgb2websafe(cmyk2rgb(_color)))
}
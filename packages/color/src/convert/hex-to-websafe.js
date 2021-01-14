import parse from "../helpers/parse";
import isHEX from "../check/is-hex";
import rgb2hex from "./rgb-to-hex";
import rgb2websafe from "./rgb-to-websafe";
import hex2rgb from "./hex-to-rgb";

export default function hex2websafe(color){
    let _color = parse(color)

    if (!isHEX(_color)) {
        throw new Error("Argument is not a HEX color")
    }

    return rgb2hex(rgb2websafe(hex2rgb(_color)))
}
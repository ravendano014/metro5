import parse from "../helpers/parse";
import isColor from "../check/is-color";
import desaturate from "./desaturate";

export default function grayscale(color){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    return desaturate(_color, 100);
}
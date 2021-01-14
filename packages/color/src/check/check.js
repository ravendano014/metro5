import isCMYK from "./is-cmyk";
import isHSLA from "./is-hsla";
import isHSL from "./is-hsl";
import isHSV from "./is-hsv";
import isRGBA from "./is-rgba";
import isRGB from "./is-rgb";
import isHEX from "./is-hex";
import isColor from "./is-color";
import parse from "../helpers/parse";

export default function check(color, type){
    const checkFor = Array.isArray(type) ? type : typeof type === "string" ? [type] : [];

    let result = false;
    let _color = parse(color)

    if (!isColor(_color))
        return false

    checkFor.forEach( (t) => {
        const fn = "is"+t.toUpperCase()+"(_color)"
        result = eval(fn)
        if (result)
            return true
    })

    return false;
}
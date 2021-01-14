import parse from "../helpers/parse";
import isColor from "../check/is-color";
import defaultColorConfig from "../defines/default-color-config";
import toHSL from "../convert/to-hsl";
import HSL from "../primitives/hsl";
import shift from "../helpers/shift";
import toColor from "../convert/to-color";

export default function triadic(color, options){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    let opt = Object.assign({}, defaultColorConfig, options);
    let result;
    let hsl = toHSL(_color);
    let h = hsl.h;

    result = [
        hsl,
        new HSL(shift(h,120), hsl.s, hsl.l),
        new HSL(shift(h,240), hsl.s, hsl.l)
    ];

    return result.map(function(el){
        return toColor(el, opt.resultType, opt.alpha)
    })
}
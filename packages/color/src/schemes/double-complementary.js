import parse from "../helpers/parse";
import isColor from "../check/is-color";
import defaultColorConfig from "../defines/default-color-config";
import toHSL from "../convert/to-hsl";
import HSL from "../primitives/hsl";
import shift from "../helpers/shift";
import toColor from "../convert/to-color";

export default function doubleComplementary(color, options){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    let opt = Object.assign({}, defaultColorConfig, options);
    let returnAs = opt.resultType
    let angle = opt.angle
    let alpha = opt.alpha
    let hsl = toHSL(_color)
    let h = hsl.h
    let result

    result = [
        hsl,
        new HSL(shift(h, 180), hsl.s, hsl.l ),
        new HSL(shift(h, angle), hsl.s, hsl.l ),
        new HSL(shift(h, 180 + angle), hsl.s, hsl.l )
    ]

    return result.map(function(el){
        return toColor(el, returnAs, alpha)
    })
}
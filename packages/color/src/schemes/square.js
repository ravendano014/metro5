import parse from "../helpers/parse";
import isColor from "../check/is-color";
import defaultColorConfig from "../defines/default-color-config";
import toHSL from "../convert/to-hsl";
import shift from "../helpers/shift";
import HSL from "../primitives/hsl";
import toColor from "../convert/to-color";

export default function square(color, options){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    let opt = Object.assign({}, defaultColorConfig, options);
    let returnAs = opt.resultType;
    let alpha = opt.alpha;
    let result = [], i;
    let hsl = toHSL(_color)
    let h = hsl.h

    result.push(hsl);

    for (i = 1; i < 4; i++) {
        h = shift(h, 90.0);
        result.push(new HSL(h, hsl.s, hsl.l));
    }

    return result.map(function(el){
        return toColor(el, returnAs, alpha)
    })
}
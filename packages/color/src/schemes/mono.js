import parse from "../helpers/parse";
import isColor from "../check/is-color";
import defaultColorConfig from "../defines/default-color-config";
import toHSV from "../convert/to-hsv";
import HSV from "../primitives/hsv";
import toColor from "../convert/to-color";

export default function monochromatic(color, options){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    let opt = Object.assign({}, defaultColorConfig, options);
    let returnAs = opt.resultType;
    let results = opt.results;
    let alpha = opt.alpha;
    let hsv = toHSV(color);
    let h = hsv.h, s = hsv.s, v = hsv.v;
    let result = [];
    let mod = 1 / results;

    while (results--) {
        result.push(new HSV(h, s, v));
        v = (v + mod) % 1;
    }

    return result.map(function(el){
        return toColor(el, returnAs, alpha);
    });
}
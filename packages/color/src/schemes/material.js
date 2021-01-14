import parse from "../helpers/parse";
import defaultColorConfig from "../defines/default-color-config";
import multiply from "../convert/multiply";
import mix from "../convert/mix"
import lighten from "../convert/lighten"
import saturate from "../convert/saturate"
import isColor from "../check/is-color";

export default function schemeMaterial(color, options){
    let _color = parse(color)

    if (!isColor(_color)) {
        throw new Error("Unknown color format!")
    }

    let opt = Object.assign({}, defaultColorConfig, options);
    let baseLight = opt.baseLight;
    let baseDark = opt.baseDark === "self" || !opt.baseDark ? multiply(_color, _color) : opt.baseDark;

    return {
        "50": mix(baseLight, color, 10),
        "100": mix(baseLight, color, 30),
        "200": mix(baseLight, color, 50),
        "300": mix(baseLight, color, 70),
        "400": mix(baseLight, color, 85),
        "500": mix(baseLight, color, 100),
        "600": mix(baseDark, color, 92),
        "700": mix(baseDark, color, 83),
        "800": mix(baseDark, color, 74),
        "900": mix(baseDark, color, 65),

        "A100": lighten(saturate(mix(baseDark, color, 15), 80), 65),
        "A200": lighten(saturate(mix(baseDark, color, 15), 80), 55),
        "A400": lighten(saturate(mix(baseLight, color, 100), 55), 10),
        "A700": lighten(saturate(mix(baseDark, color, 83), 65), 10)
    };
}
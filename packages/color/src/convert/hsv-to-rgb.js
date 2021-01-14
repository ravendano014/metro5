import parse from "../helpers/parse"
import isHSV from "../check/is-hsv"
import RGB from "../primitives/rgb"
import {isNull} from "@metro5/utils"
import RGBA from "../primitives/rgba"

export default function hsv2rgb(color, alpha){
    let _color = parse(color)

    if (!isHSV(_color)) {
        throw new Error('Argument is not a HSV color')
    }

    let r, g, b
    let h = _color.h, s = _color.s * 100, v = _color.v * 100
    let Hi = Math.floor(h / 60)
    let Vmin = ((100 - s) * v) / 100
    let al = (v - Vmin) * ((h % 60) / 60)
    let Vinc = Vmin + al
    let Vdec = v - al

    switch (Hi) {
        case 0:
            r = v
            g = Vinc
            b = Vmin
            break
        case 1:
            r = Vdec
            g = v
            b = Vmin
            break
        case 2:
            r = Vmin
            g = v
            b = Vinc
            break
        case 3:
            r = Vmin
            g = Vdec
            b = v
            break
        case 4:
            r = Vinc
            g = Vmin
            b = v
            break
        case 5:
            r = v
            g = Vmin
            b = Vdec
            break
    }

    r = Math.round((r * 255) / 100)
    g = Math.round((g * 255) / 100)
    b = Math.round((b * 255) / 100)

    return isNull(alpha) ? new RGB(r, g, b) : new RGBA(r, g, b, alpha)
}
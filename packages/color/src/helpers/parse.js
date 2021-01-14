import defaultPalette from "../palettes/default"
import metroPalette from "../palettes/metro"
import expandHexColor from "./expand-hex";
import RGBA from "../primitive/rgba";
import RGB from "../primitive/rgb";
import CMYK from "../primitive/cmyk";
import HSV from "../primitive/hsv";
import HSLA from "../primitive/hsla";
import HSL from "../primitive/hsl";

export default function parse(color){
    const _color = color.toLowerCase().trim();

    const a = _color
        .replace(/[^%\d.,]/g, "")
        .split(",")
        .map((v) => {
            if (v.includes('%')) {
                v = ""+parseInt(v)/100;
            }
            return v.includes(".") ? parseFloat(v) : parseInt(v);
        });

    if (
        color instanceof RGB ||
        color instanceof RGBA ||
        color instanceof HSL ||
        color instanceof HSLA ||
        color instanceof HSV ||
        color instanceof CMYK
    ) {
        return color;
    }

    if (metroPalette[_color]) {
        return expandHexColor(metroPalette[_color]);
    }

    if (defaultPalette[_color]) {
        return expandHexColor(defaultPalette[_color]);
    }

    if (_color[0] === "#") {
        return expandHexColor(_color);
    }

    if (_color.includes("rgba") && a.length === 4) {
        return new RGBA(a[0], a[1], a[2], a[3]);
    }
    if (_color.includes("rgb") && a.length === 3) {
        return new RGB(a[0], a[1], a[2]);
    }
    if (_color.includes("cmyk") && a.length === 4) {
        return new CMYK(a[0], a[1], a[2], a[3]);
    }
    if (_color.includes("hsv") && a.length === 3) {
        return new HSV(a[0], a[1], a[2]);
    }
    if (_color.includes("hsla") && a.length === 4) {
        return new HSLA(a[0], a[1], a[2], a[3]);
    }
    if (_color.includes("hsl") && a.length === 3) {
        return new HSL(a[0], a[1], a[2]);
    }
    return undefined;
}
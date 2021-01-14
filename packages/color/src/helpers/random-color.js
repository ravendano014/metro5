import colorTypes from "../defines/color-types"
import {random} from "@metro5/utils"

export default function randomColor(colorType = colorTypes.HEX, alpha = 1){
    let hex, r, g, b;

    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);

    hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return colorType === "hex" ? hex : this.toColor(hex, colorType, alpha);
}
import colorTypes from "../defines/color-types"
import parse from "./parse";
import isColor from "../check/is-color";
import toColor from "../convert/to-color";

export default function createColor(colorType = colorTypes.HEX, from = "#000000"){
    let color;

    if (typeof from === "string") {
        color = parse(from);
    }

    if (!isColor(color)) {
        color = "#000000";
    }

    return toColor(color, colorType);
}
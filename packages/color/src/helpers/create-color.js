import colorTypes from "../defines/color-types"
import parse from "./parse";
import isColor from "./is-color";

export default function(colorType = colorTypes.HEX, from = "#000000"){
    let color;

    if (typeof from === "string") {
        color = parse(from);
    }

    if (!isColor(color)) {
        color = "#000000";
    }

    return toColor(color, colorType);
}
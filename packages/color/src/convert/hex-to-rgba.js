import expandHexColor from "../helpers/expand-hex"
import RGBA from "../primitives/rgba"

export default function hex2rgba(color, alpha = 1){
    if (typeof color !== "string") {
        throw new Error("Value is not a string!")
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        expandHexColor(color)
    );

    if (!result) {
        return undefined
    }

    const rgb = [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ];

    return new RGBA(rgb[0], rgb[1], rgb[2], alpha);
}
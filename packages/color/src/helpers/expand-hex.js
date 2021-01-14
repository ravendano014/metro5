export default function expandHexColor(hex){
    if (typeof hex !== "string") {
        throw new Error("Value is not a string!")
    }
    if (hex[0] === "#" && hex.length < 7) {
        const pattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
        return "#" + hex.substr(0, 4).replace(pattern, (m, r, g, b) => r + r + g + g + b + b)
    }
    return hex[0] === "#" ? hex : "#" + hex;
}
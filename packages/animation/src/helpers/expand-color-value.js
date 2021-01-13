// TODO switch to Color.expandColor

export  default function expandColorValue (val) {
    const regExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    if (val[0] === "#" && val.length === 4) {
        return "#" + val.replace(regExp, (m, r, g, b) => r + r + g + g + b + b);
    }
    return val[0] === "#" ? val : "#"+val;
}
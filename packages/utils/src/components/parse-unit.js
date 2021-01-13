export default function parseUnit(str, out) {
    if (!out)
        out = [ 0, '' ];

    str = ""+str;

    out[0] = parseFloat(str);
    out[1] = str.match(/[\d.\-+]*\s*(.*)/)[1] || '';

    return out;
}
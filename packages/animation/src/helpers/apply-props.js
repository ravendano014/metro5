import setStyle from "./set-style";
import getElementTransforms from "./get-element-trasforms";
import {each} from "@metro5/utils";

function _applyColors (el, mapProps, p) {
    each(mapProps, function (key, val) {
        let result = [0, 0, 0], v;
        for (let i = 0; i < 3; i++) {
            result[i] = Math.floor(val[0][i] + (val[2][i] * p));
        }
        v = "rgb("+(result.join(","))+")";
        el.style[key] = v;
    });

    return el;
}

function _applyTransform (el, mapProps, p) {
    let t = [];
    let elTransforms = getElementTransforms(el);

    each(mapProps, function(key, val) {
        let from = val[0], to = val[1], delta = val[2], unit = val[3];
        key = "" + key;

        if ( key.includes("rotate") || key.includes("skew")) {
            if (unit === "") unit = "deg";
        }

        if (key.includes('scale')) {
            unit = '';
        }

        if (key.includes('translate') && unit === '') {
            unit = 'px';
        }

        if (unit === "turn") {
            t.push(key+"(" + (to * p) + unit + ")");
        } else {
            t.push(key +"(" + (from + (delta * p)) + unit+")");
        }
    });

    each(elTransforms, (key, val) => {
        if (mapProps[key] === undefined) {
            t.push(key+"("+val+")");
        }
    });

    el.style.transform = t.join(" ");
    return el;
}

function _applyStyles (el, mapProps, p) {
    each(mapProps, (key, val) => {
        setStyle(el, key, val[0] + (val[2] * p), val[3], val[4]);
    });
    return el;
}



export default function applyProps (el, map, p) {
    _applyStyles(el, map.props, p);
    _applyTransform(el, map.transform, p);
    _applyColors(el, map.color, p);
}


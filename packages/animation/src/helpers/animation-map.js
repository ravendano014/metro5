import getElementTransforms from "./get-element-trasforms"
import {transformProps, numberProps, reverseProps, floatProps} from "./props"
import {each, isNull, parseUnit} from "@metro5/utils"
import getColorArrayFromElement from "./get-color-array-from-element";
import getStyle from "./get-style";
import getRelativeValue from "./get-relative-value";
import getColorArrayFromHex from "./get-color-array-from-hex";
import expandColorValue from "./expand-color-value";

export default function createAnimationMap (el, draw, dir) {
    const map = {
        props: {},
        transform: {},
        color: {}
    };
    let i, from, to, delta, unit, temp;
    let elTransforms = getElementTransforms(el);

    if (isNull(dir)) {
        dir = "normal";
    }

    each(draw, function(key, val) {

        key = "" + key;

        let isTransformProp = transformProps.includes(key);
        let isNumProp = numberProps.includes(key);
        let isColorProp = key.toLowerCase().includes("color");

        if (Array.isArray(val) && val.length === 1) {
            val = val[0];
        }

        if (!Array.isArray(val)) {
            if (isTransformProp) {
                from = elTransforms[key] || 0;
            } else if (isColorProp) {
                from = getColorArrayFromElement(el, key);
            } else {
                from = getStyle(el, key);
            }
            from = !isColorProp ? parseUnit(from) : from;
            to = !isColorProp ? parseUnit(getRelativeValue(val, Array.isArray(from) ? from[0] : from)) : getColorArrayFromHex(val);
        } else {
            from = !isColorProp ? parseUnit(val[0]) : getColorArrayFromHex(expandColorValue(val[0]));
            to = !isColorProp ? parseUnit(val[1]) : getColorArrayFromHex(expandColorValue(val[1]));
        }

        if (reverseProps.includes(key) && from[0] === to[0]) {
            from[0] = to[0] > 0 ? 0 : 1;
        }

        if (dir === "reverse") {
            temp = from;
            from = to;
            to = temp;
        }

        unit = el instanceof HTMLElement && to[1] === '' && !isNumProp && !isTransformProp ? 'px' : to[1];

        if (isColorProp) {
            delta = [0, 0, 0];
            for (i = 0; i < 3; i++) {
                delta[i] = to[i] - from[i];
            }
        } else {
            delta = to[0] - from[0];
        }

        if (isTransformProp) {
            map.transform[key] = [from[0], to[0], delta, unit];
        } else if (isColorProp) {
            map.color[key] = [from, to, delta, unit];
        } else {
            map.props[key] = [from[0], to[0], delta, unit, !floatProps.includes(key)];
        }
    });

    return map;
}
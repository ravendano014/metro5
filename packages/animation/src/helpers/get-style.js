import {scrollProps} from "./props"

export default function getStyle (el, prop, pseudo){
    if (typeof el[prop] !== "undefined") {
        if (scrollProps.includes(prop)) {
            return prop === "scrollLeft" ? el === window ? pageXOffset : el.scrollLeft : el === window ? pageYOffset : el.scrollTop;
        } else {
            return el[prop] || 0;
        }
    }

    return el.style[prop] || getComputedStyle(el, pseudo)[prop];
}
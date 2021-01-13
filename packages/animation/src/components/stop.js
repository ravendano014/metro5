import ANIMATION_QUEUE from "./queue"
import {each, isNull, matches} from "@metro5/utils";

export function stopAnimation(id, done){
    const an = ANIMATION_QUEUE[id];

    if (typeof an === "undefined") {
        return ;
    }

    if (isNull(done)) {
        done = true;
    }

    an.stop = done === true ? 2 : 1;

    if (typeof an.onStop === "function") {
        an.onStop.apply(an.element);
    }
}

export function stopAnimationAll(done, filter){
    each(ANIMATION_QUEUE, (k, v) => {
        if (filter) {
            if (typeof filter === "string") {
                if (matches.call(v.element, filter)) stopAnimation(k, done);
            } else if (filter.length) {
                each(filter, (i, el) => {
                    if (v.element === el) stopAnimation(k, done);
                });
            } else if (filter instanceof Element) {
                if (v.element === filter) stopAnimation(k, done);
            }
        } else {
            stopAnimation(k, done);
        }
    });
}
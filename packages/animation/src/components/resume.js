import ANIMATION_QUEUE from "./queue"
import {each, matches} from "@metro5/utils";

export function resumeAnimation(id){
    const an = ANIMATION_QUEUE[id];

    if (typeof an === "undefined") {
        return ;
    }

    an.pause = 0;
    an.paused = 0;

    if (typeof an.onResume === "function") {
        an.onResume.apply(an.element);
    }
}

export function resumeAnimationAll(filter){
    each(ANIMATION_QUEUE, (k, v) => {
        if (filter) {
            if (typeof filter === "string") {
                if (matches.call(v.element, filter)) resumeAnimation(k);
            } else if (filter.length) {
                each(filter, (i, el) => {
                    if (v.element === el) resumeAnimation(k);
                });
            } else if (filter instanceof Element) {
                if (v.element === filter) resumeAnimation(k);
            }
        } else {
            resumeAnimation(k);
        }
    });
}
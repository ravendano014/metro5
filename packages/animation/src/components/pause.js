import ANIMATION_QUEUE from "./queue"
import {each, matches} from "@metro5/utils";

export function pauseAnimation(id){
    const an = ANIMATION_QUEUE[id];

    if (typeof an === "undefined") {
        return ;
    }

    an.pause = 1;
    an.paused = performance.now();

    if (typeof an.onPause === "function") {
        an.onPause.apply(an.element);
    }
}

export function pauseAnimationAll(filter){
    each(ANIMATION_QUEUE, (k, v) => {
        if (filter) {
            if (typeof filter === "string") {
                if (matches.call(v.element, filter)) pauseAnimation(k);
            } else if (filter.length) {
                each(filter, (i, el) => {
                    if (v.element === el) pauseAnimation(k);
                });
            } else if (filter instanceof Element) {
                if (v.element === filter) pauseAnimation(k);
            }
        } else {
            pauseAnimation(k);
        }
    });
}
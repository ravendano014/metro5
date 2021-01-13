import Easing from "./easing";
import {defaultAnimationProps} from "./defaults"
import {isNull} from "@metro5/utils"
import createAnimationMap from "../helpers/animation-map"
import applyProps from "../helpers/apply-props"
import ANIMATION_QUEUE from "./queue"

export default function startAnimation(args){
    return new Promise((resolve) => {
        const props = Object.assign({}, defaultAnimationProps, args);
        const {id, draw, ease, onStart, onFrame, onDone, pause: pauseStart, dir, defer} = props;
        let direction = dir === "alternate" ? "normal" : dir;
        const animationID = id ? id : +(performance.now() * Math.pow(10, 14));
        let matchArgs, replay = false, el = props.el, dur = props.dur, loop = props.loop;
        let easeName = "linear", easeArgs = [], easeFn = Easing.default;
        let map;

        if (isNull(el)) {
            throw new Error("Unknown element!");
        }

        if (typeof el === "string") {
            el = document.querySelector(el);
        }

        if (typeof draw !== "function" && typeof draw !== "object") {
            throw new Error("Unknown draw object. Must be a function or object!");
        }

        if (dur === 0) {
            dur = 1;
        }

        if (dir === "alternate" && typeof loop === "number") {
            loop *= 2;
        }

        if (typeof ease === "string") {
            matchArgs = /\(([^)]+)\)/.exec(ease);
            easeName = ease.split("(")[0];
            easeArgs = matchArgs ? matchArgs[1].split(',').map( p => parseFloat(p)) : [];
            easeFn = Easing[easeName] || Easing.linear;
        } else if (typeof ease === "function") {
            easeFn = ease;
        }

        ANIMATION_QUEUE[animationID] = {
            element: el,
            id: null,
            stop: 0,
            pause: 0,
            loop: 0,
            t: -1,
            started: 0,
            paused: 0
        };

        const play = function() {
            if (typeof draw === "object") {
                map = createAnimationMap(el, draw, direction);
            }

            if (typeof onStart === "function") {
                onStart.apply(el);
            }

            // start = performance.now();
            ANIMATION_QUEUE[animationID].loop += 1;
            ANIMATION_QUEUE[animationID].started = performance.now();
            ANIMATION_QUEUE[animationID].duration = dur;
            ANIMATION_QUEUE[animationID].id = requestAnimationFrame(animate);
        };

        const done = function() {
            cancelAnimationFrame(ANIMATION_QUEUE[animationID].id);
            delete ANIMATION_QUEUE[id];

            if (typeof onDone === "function") {
                onDone.apply(el);
            }

            resolve();
        };

        const animate = function(time) {
            let p, t;
            let stop = ANIMATION_QUEUE[animationID].stop;
            let pause = ANIMATION_QUEUE[animationID].pause;
            let start = ANIMATION_QUEUE[animationID].started;

            if (ANIMATION_QUEUE[animationID].paused) {
                start = time - ANIMATION_QUEUE[animationID].t * dur;
                ANIMATION_QUEUE[animationID].started = start;
            }

            t = ((time - start) / dur).toFixed(4);

            if (t > 1) t = 1;
            if (t < 0) t = 0;

            p = easeFn.apply(null, easeArgs)(t);

            ANIMATION_QUEUE[animationID].t = t;
            ANIMATION_QUEUE[animationID].p = p;

            if (pause) {
                ANIMATION_QUEUE[animationID].id = requestAnimationFrame(animate);
                // ANIMATION_QUEUE[animationID].started = performance.now();
                return;
            }

            if ( stop > 0) {
                if (stop === 2) {
                    if (typeof draw === "function") {
                        draw.bind(el)(1, 1);
                    } else {
                        applyProps(el, map, 1);
                    }
                }
                done();
                return;
            }

            if (typeof draw === "function") {
                draw.bind(el)(t, p);
            } else {
                applyProps(el, map, p);
            }

            if (typeof onFrame === 'function') {
                onFrame.apply(el, [t, p]);
            }

            if (t < 1) {
                ANIMATION_QUEUE[animationID].id = requestAnimationFrame(animate);
            }

            if (parseInt(t) === 1) {
                if (loop) {
                    if (dir === "alternate") {
                        direction = direction === "normal" ? "reverse" : "normal";
                    }

                    if (typeof loop === "boolean") {
                        setTimeout( () => {
                            play();
                        }, pauseStart);
                    } else {
                        if (loop > ANIMATION_QUEUE[animationID].loop) {
                            setTimeout( () => {
                                play();
                            }, pauseStart);
                        } else {
                            done();
                        }
                    }
                } else {
                    if (dir === "alternate" && !replay) {
                        direction = direction === "normal" ? "reverse" : "normal";
                        replay = true;
                        play();
                    } else {
                        done();
                    }
                }
            }
        };
        if (defer > 0) {
            setTimeout(() => {
                play();
            }, defer);
        } else {
            play();
        }
    });
}
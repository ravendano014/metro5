import Easing from "./components/easing"
import defaultAnimationProps from "./defaults/animation"
import defaultChainOptions from "./defaults/animation"
import startAnimation from "./components/animate"
import chainAnimation from "./components/chain"
import {stopAnimation, stopAnimationAll} from "./components/stop"
import {resumeAnimation, resumeAnimationAll} from "./components/resume"
import {pauseAnimation, pauseAnimationAll} from "./components/pause"
import {getGlobalObject} from "@metro5/utils"

const _global = getGlobalObject();

if (typeof _global !== "undefined") {
    _global.startAnimation = startAnimation;
    _global.chainAnimation = chainAnimation;
    _global.stopAnimation = stopAnimation;
    _global.stopAnimationAll = stopAnimationAll;
    _global.pauseAnimation = pauseAnimation;
    _global.pauseAnimationAll = pauseAnimationAll;
    _global.resumeAnimation = resumeAnimation;
    _global.resumeAnimationAll = resumeAnimationAll;
    _global.defaultAnimationProps = defaultAnimationProps;
    _global.defaultChainOptions = defaultChainOptions;
    _global.easeAnimation = Easing;
}

export const AnimationNS = {
    defaultAnimationProps,
    defaultChainOptions,
    Easing,
    startAnimation,
    chainAnimation,
    stopAnimation,
    stopAnimationAll,
    pauseAnimation,
    pauseAnimationAll,
    resumeAnimation,
    resumeAnimationAll
}
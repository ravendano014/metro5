import Easing from "./components/easing"
import {defaultAnimationProps} from "./components/defaults"
import ANIMATION_QUEUE from "./components/queue"
import startAnimation from "./components/animate"
import chainAnimation from "./components/chain"
import {stopAnimation, stopAnimationAll} from "./components/stop"
import {resumeAnimation, resumeAnimationAll} from "./components/resume"
import {pauseAnimation, pauseAnimationAll} from "./components/pause"

export {
    ANIMATION_QUEUE,
    defaultAnimationProps,
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
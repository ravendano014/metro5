import Easing from "./components/easing"
import defaultAnimationProps from "./defaults/animation"
import defaultChainOptions from "./defaults/animation"
import start from "./components/animate"
import chain from "./components/chain"
import {stopAnimation as stop, stopAnimationAll as stopAll} from "./components/stop"
import {resumeAnimation as resume, resumeAnimationAll as resumeAll} from "./components/resume"
import {pauseAnimation as pause, pauseAnimationAll as pauseAll} from "./components/pause"

const Animation = {
    start,
    chain,
    stop,
    stopAll,
    resume,
    resumeAll,
    pause,
    pauseAll,
    Easing,
    defaultAnimationProps,
    defaultChainOptions
}

export default Animation

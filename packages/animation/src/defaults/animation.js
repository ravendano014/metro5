import Easing from "../components/easing"

const defaultAnimationProps = {
    id: null,
    el: null,
    draw: {},
    dur: 1000,
    ease: Easing.default,
    loop: 0,
    pause: 0,
    dir: "normal",
    defer: 0,
    onStart: () => {},
    onStop: () => {},
    onStopAll: () => {},
    onPause: () => {},
    onPauseAll: () => {},
    onResume: () => {},
    onResumeAll: () => {},
    onFrame: () => {},
    onDone: () => {}
}

export default defaultAnimationProps
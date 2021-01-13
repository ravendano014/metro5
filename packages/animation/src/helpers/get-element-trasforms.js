import validElement from "./valid-element"

export default function getElementTransforms (el) {
    if (!validElement(el)) return {};

    const str = el.style.transform || '';
    const reg = /(\w+)\(([^)]*)\)/g;
    const transforms = {};
    let m;

    while (m = reg.exec(str))
        transforms[m[1]] = m[2];

    return transforms;
}
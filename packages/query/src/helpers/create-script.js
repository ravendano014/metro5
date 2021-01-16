import {isNull} from "@metro5/utils";
import $ from "../components/$";

export default function createScript(script){
    const s = document.createElement('script');
    s.type = 'text/javascript';

    if (isNull(script))
        return undefined;

    const _script = $(script)[0];

    if (_script.src) {
        s.src = _script.src;
    } else {
        s.textContent = _script.innerText;
    }

    document.body.appendChild(s);

    if (_script.parentNode) _script.parentNode.removeChild(_script);

    return s;
}

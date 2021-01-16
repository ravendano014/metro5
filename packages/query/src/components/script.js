import {each, isNull} from "@metro5/utils";
import $ from "./$";
import createScript from "../helpers/create-script";

$.script = (el) => {
    if (isNull(el)) {
        return ;
    }

    const _el = $(el)[0];

    if (_el.tagName && _el.tagName === "SCRIPT") {
        createScript(_el);
    } else each($(_el).find("script"), (i, v) => {
        createScript(v);
    });
}

const Script = {
    script: function(){
        return each(this, (i, v) => {
            $.script(v);
        });
    }
}

export default Script
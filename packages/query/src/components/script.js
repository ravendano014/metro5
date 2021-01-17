import {each, isNull} from "@metro5/utils";
import $ from "../$"

const Script = {
    script: function(){
        return each(this, (i, v) => {
            $.script(v);
        });
    }
}

export default Script
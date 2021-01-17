import {Datetime, datetime} from "../type";

Datetime.useStatic({
    max(){
        let arr = [].slice.call(arguments);
        return arr.map((el) => datetime(el)).sort((a, b) => b.time() - a.time())[0];
    }
});

Datetime.use({
    max(){
        return Datetime.max.apply(this, [this].concat([].slice.call(arguments)));
    }
});

import Datetime, {datetime} from "../type";


Datetime.useStatic({
    min(){
        let arr = [].slice.call(arguments);
        return arr.map((el) => datetime(el)).sort((a, b) => a.time() - b.time())[0];
    }
});

Datetime.use({
    min(){
        return Datetime.min.apply(this, [this].concat([].slice.call(arguments)));
    }
})

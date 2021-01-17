import {Datetime, datetime} from "../type";

Datetime.useStatic({
    timestamp(){
        return new Date().getTime() / 1000;
    }
})

Datetime.use({
    unix(val) {
        let _val;

        if (!arguments.length || (Datetime.not(val))) {
            return Math.floor(this.valueOf() / 1000)
        }

        _val = val * 1000;

        if (this.mutable) {
            return this.time(_val);
        }

        return datetime(this.value).time(_val);
    },

    timestamp(){
        return this.unix();
    }
});

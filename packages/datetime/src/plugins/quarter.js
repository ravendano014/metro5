import {Datetime, datetime} from "../type";

const fnAlign = Datetime.align;
const fnAlignEnd = Datetime.alignEnd;
const fnAdd = Datetime.prototype.add;

Datetime.useStatic({
    align(d, align){
        let date = datetime(d), result;

        switch(align) {
            case "quarter":  result = Datetime.align(date, 'day').day(1).month(date.quarter() * 3 - 3); break; //quarter
            default: result = fnAlign.apply(this, [date, align]);
        }

        return result;
    },

    alignEnd(d, align){
        let date = datetime(d), result;

        switch(align) {
            case "quarter":  result = Datetime.align(date, 'quarter').add(3, 'month').add(-1, 'ms'); break; //quarter
            default: result = fnAlignEnd.apply(this, [date, align]);
        }

        return result;
    }
})

Datetime.use({
    quarter(){
        const month = this.month();

        if (month <= 2) return 1;
        if (month <= 5) return 2;
        if (month <= 8) return 3;
        return 4;
    },

    add(val, to){
        if (to === "quarter") {
            return this.month(this.month() + val * 3);
        }
        return fnAdd.bind(this)(val, to);
    },

    addQuarter(v){
        return this.add(v, "quarter");
    }
})

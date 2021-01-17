import {Datetime, datetime} from "../type";

Datetime.use({
    same(d){
        return this.time() === datetime(d).time();
    },

    /*
    * align: year, month, day, hour, minute, second, ms = default
    * */
    compare(d, align, operator = "="){
        const date = datetime(d);
        const curr = datetime(this.value);
        let t1, t2;

        operator = operator || "=";

        if (["<", ">", ">=", "<=", "=", "!="].includes(operator) === false) {
            operator = "=";
        }

        align = (align || "ms").toLowerCase();

        t1 = curr.align(align).time();
        t2 = date.align(align).time();

        switch (operator) {
            case "<":
                return t1 < t2;
            case ">":
                return t1 > t2;
            case "<=":
                return t1 <= t2;
            case ">=":
                return t1 >= t2;
            case "=":
                return t1 === t2;
            case "!=":
                return t1 !== t2;
        }
    },

    between(d1, d2){
        return this.younger(d1) && this.older(d2);
    },

    older(date, align){
        return this.compare(date, align, "<");
    },

    olderOrEqual(date, align){
        return this.compare(date, align, "<=");
    },

    younger(date, align){
        return this.compare(date, align, ">");
    },

    youngerOrEqual(date, align){
        return this.compare(date, align, ">=");
    },

    equal(date, align){
        return this.compare(date, align, "=");
    },

    notEqual(date, align){
        return this.compare(date, align, "!=");
    },

    diff(d){
        const date = datetime(d);
        const diff = Math.abs(this.time() - date.time());
        const diffMonth = Math.abs(this.month() - date.month() + (12 * (this.year() - date.year())));

        return {
            "ms": diff,
            "second": Math.ceil(diff / 1000),
            "minute": Math.ceil(diff / (1000 * 60)),
            "hour": Math.ceil(diff / (1000 * 60 * 60)),
            "day": Math.ceil(diff / (1000 * 60 * 60 * 24)),
            "month": diffMonth,
            "year": Math.floor(diffMonth / 12)
        }
    },

    distance(d, align){
        return this.diff(d)[align];
    }
})

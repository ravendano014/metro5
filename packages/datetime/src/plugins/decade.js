import Datetime from "../type";

Datetime.use({
    decade(){
        return Math.floor(this.year()/10) * 10;
    },

    decadeStart(){
        const decade = this.decade();
        const result = this.mutable ? this : this.clone();

        return result.year(decade).month(0).day(1);
    },

    decadeEnd(){
        const decade = this.decade() + 9;
        const result = this.mutable ? this : this.clone();

        return result.year(decade).month(11).day(31);
    },

    decadeOfMonth(){
        const part = this.clone().add(1, "month").day(1).add(-1, 'day').day() / 3;
        const day = this.day();

        if (day <= part) return 1;
        if (day <= part * 2) return 2;
        return 3;
    }
})

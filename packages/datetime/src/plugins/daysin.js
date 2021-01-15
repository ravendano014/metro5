import Datetime, {datetime} from "../type";

Datetime.use({
    daysInMonth(){
        const curr = datetime(this.value);
        return curr.add(1, 'month').day(1).add(-1, 'day').day();
    },

    daysInYear(){
        return this.isLeapYear() ? 366 : 365;
    },

    daysInYearMap(){
        const result = [];
        const curr = datetime(this.value);

        curr.month(0).day(1);

        for(let i = 0; i < 12; i++) {
            curr.add(1, 'month').add(-1, 'day');
            result.push(curr.day());
            curr.day(1).add(1, 'month');
        }
        return result;
    },

    daysInYearObj(locale, shortName){
        const map = this.daysInYearMap();
        const result = {};
        const names = Datetime.getLocale(locale || this.locale);

        map.forEach((v, i) => result[names[shortName ? 'monthsShort' : 'months'][i]] = v);

        return result;
    }
})

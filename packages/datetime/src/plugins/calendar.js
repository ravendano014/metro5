import {Datetime, datetime} from "../type";

Datetime.use({
    // 1 - Monday, 0 - Sunday
    calendar(weekStart){
        return Datetime.calendar(this, weekStart);
    }
});

Datetime.useStatic({
    calendar(d, iso){
        let date = d instanceof Datetime ? d.clone().align("month") : datetime(d);
        let ws = iso === 0 || iso ? iso : date.weekStart;
        let wd = ws ? date.isoWeekDay() : date.weekDay();
        let names = Datetime.getLocale(date.locale);
        let now = datetime(), i;

        const getWeekDays = (wd, ws) => {
            if (ws === 0) {
                return wd;
            }
            let su = wd[0];
            return wd.slice(1).concat([su]);
        }

        const result = {
            month: names.months[date.month()],
            days: [],
            weekstart: iso ? 1 : 0,
            weekdays: getWeekDays(names.weekdaysMin,ws),
            today: now.format("YYYY-MM-DD"),
            weekends: [],
            week: []
        };

        date.addDay(ws ? -wd+1 : -wd);

        for(i = 0; i < 42; i++) {
            result.days.push(date.format("YYYY-MM-DD"));
            date.add(1, 'day');
        }

        result.weekends = result.days.filter(function(v, i){
            const def = [0,6,7,13,14,20,21,27,28,34,35,41];
            const iso = [5,6,12,13,19,20,26,27,33,34,40,41];

            return ws === 0 ? def.includes(i) : iso.includes(i);
        });

        date = now.clone();
        wd = ws ? date.isoWeekDay() : date.weekDay();
        date.addDay(ws ? -wd+1 : -wd);
        for (i = 0; i < 7; i++) {
            result.week.push(date.format("YYYY-MM-DD"));
            date.add(1, 'day');
        }

        return result;
    }
});

import {Datetime, datetime} from "../type";

Datetime.useStatic({
    isToday(date){
        const d = datetime(date).align("day");
        const c = datetime().align('day');

        return d.time() === c.time();
    }
})

Datetime.use({
    isToday(){
        return Datetime.isToday(this);
    },

    today(){
        const now = datetime();

        if (!this.mutable) {
            return now;
        }
        return this.val(now.val());
    }
})

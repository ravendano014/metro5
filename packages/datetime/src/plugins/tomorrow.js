import {Datetime, datetime} from "../type";

Datetime.useStatic({
    isTomorrow(date){
        const d = datetime(date).align("day");
        const c = datetime().align('day').add(1, 'day');

        return d.time() === c.time();
    }
});

Datetime.use({
    isTomorrow(){
        return Datetime.isTomorrow(this);
    },

    tomorrow(){
        if (!this.mutable) {
            return this.clone().immutable(false).add(1, 'day').immutable(!this.mutable);
        }
        return this.add(1, 'day');
    }
});

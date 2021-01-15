import Datetime from "../type";

Datetime.use({
    toDateString(){
        return this.value.toDateString();
    },

    toISOString(){
        return this.value.toISOString();
    },

    toJSON(){
        return this.value.toJSON();
    },

    toGMTString(){
        return this.value.toGMTString();
    },

    toLocaleDateString(){
        return this.value.toLocaleDateString();
    },

    toLocaleString(){
        return this.value.toLocaleString();
    },

    toLocaleTimeString(){
        return this.value.toLocaleTimeString();
    },

    toTimeString(){
        return this.value.toTimeString();
    },

    toUTCString(){
        return this.value.toUTCString();
    },

    toDate(){
        return new Date(this.value);
    }
});

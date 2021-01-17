import {split} from "@metro5/cake";
import {isNull} from "@metro5/utils";
import $ from "../$"

const Classes = {
    addClass(){},
    removeClass(){},
    toggleClass(){},

    containsClass(cls){
        return this.hasClass(cls);
    },

    hasClass(cls){
        let result = false;
        let classes;

        if (isNull(cls)) {
            return false;
        }

        classes = split(cls, " ")

        this.each((i, el) => {
            $.each(classes, (k, v) => {
                if (!result && el.classList && el.classList.contains(v)) {
                    result = true;
                }
            });
        });

        return result;
    },

    clearClasses(){
        return this.each((i, el) => {
            el.className = "";
        });
    },

    classes(array){
        return this.length === 0 ? undefined : array ? split(this[0].className," ") : this[0].className.trim();
    },

    removeClassBy(mask){
        return this.each((i, el) => {
            const $el = $(el);
            const classes = $el.classes(true);
            $.each(classes, (i, v) => {
                if (v.includes(mask)) {
                    $el.removeClass(v);
                }
            });
        });
    }
}

const methods = ['add', 'remove', 'toggle']

methods.forEach(function (method) {
    Classes[method + "Class"] = function(cls) {
        if (!cls)
            return this

        return this.each((i, el) => {
            console.log(cls, split(cls, " "))
            $.each(split(cls, " "), (k, v) => {
                el.classList[method](v);
            });
        });
    };
});

export default Classes
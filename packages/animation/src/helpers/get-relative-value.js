import {getUnit} from "@metro5/utils"

export default function getRelativeValue (to, from) {
    const operator = /^(\*=|\+=|-=)/.exec(to);

    if (!operator) return to;

    const u = getUnit(to) || 0;
    const x = parseFloat(from);
    const y = parseFloat(to.replace(operator[0], ''));

    switch (operator[0][0]) {
        case '+':
            return x + y + u;
        case '-':
            return x - y + u;
        case '*':
            return x * y + u;
        case '/':
            return x / y + u;
    }
}
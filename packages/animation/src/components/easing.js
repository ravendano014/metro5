import minMax from "../helpers/min-max"

const Easing = {
    linear: () => t => t
}

Easing.default = Easing.linear

const eases = {
    Sine: () => t => 1 - Math.cos(t * Math.PI / 2),
    Circ: () => t => 1 - Math.sqrt(1 - t * t),
    Back: () => t => t * t * (3 * t - 2),
    Bounce: () => (t) => {
            let pow2, b = 4;
            while (t < (( pow2 = (2 ** --b)) - 1) / 11) {
                //
            }
            return 1 / (4 ** (3 - b)) - 7.5625 * ((( pow2 * 3 - 2 ) / 22 - t) ** 2);
    },
    Elastic: (amplitude, period) => {
        let a = minMax(amplitude, 1, 10)
        let p = minMax(period, 0.1, 2)

        return (t) => {
            return (t === 0 || t === 1) ? t :
                -a * (2 ** (10 * (t - 1))) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p)
        }
    }
}

['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach((name, i) => eases[name] = () => t => Math.pow(t, i + 2));

Object.keys(eases).forEach((name) => {
    const easeIn = eases[name];

    Easing['easeIn' + name] = easeIn;
    Easing['easeOut' + name] = (a, b) => t => 1 - easeIn(a, b)(1 - t);
    Easing['easeInOut' + name] = (a, b) => t => t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
});

export default Easing;
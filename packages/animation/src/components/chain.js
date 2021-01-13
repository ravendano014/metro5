import defaultChainOptions from "../defaults/chain"
import startAnimation from "./animate"

export default function chainAnimation(arr, opt){
    const o = Object.assign({}, defaultChainOptions, opt);

    if (typeof o.loop !== "boolean") {
        o.loop--;
    }

    if (!Array.isArray(arr)) {
        console.warn("Chain array is not defined!");
        return false;
    }

    const reducer = (acc, item) => {
        return acc.then(() => {
            if (typeof o["onChainItem"] === "function") {
                o["onChainItem"](item);
            }
            return startAnimation(item).then(() => {
                if (typeof o["onChainItemComplete"] === "function") {
                    o["onChainItemComplete"](item);
                }
            });
        });
    };

    arr.reduce(reducer, Promise.resolve()).then(() => {
        if (typeof o["onChainComplete"] === "function") {
            o["onChainComplete"]();
        }

        if (o.loop) {
            chainAnimation(arr, o);
        }
    });
}
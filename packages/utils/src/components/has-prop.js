export default function hasProp(obj, prop){
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
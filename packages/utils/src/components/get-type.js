export default function getType(obj) {
    return Object.prototype.toString.call(obj).replace(/^\[object (.+)]$/, '$1').toLowerCase();
}
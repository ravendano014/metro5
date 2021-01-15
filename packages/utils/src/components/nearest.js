/**
 * Function return nearest number with precision and direction
 * @param val
 * @param precision
 * @param down
 * @returns {number}
 */
export default function nearest(val, precision, down){
    val /= precision;
    val = Math[down === true ? 'floor' : 'ceil'](val) * precision;
    return val;
}
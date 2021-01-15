/**
 * Check if value between top and bottom values
 * @param val
 * @param bottom
 * @param top
 * @param equals
 * @returns {boolean|boolean}
 */
export default function between(val, bottom, top, equals = true){
    return equals === true ? val >= bottom && val <= top : val > bottom && val < top;
}
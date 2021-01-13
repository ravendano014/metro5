/**
 * Function check if object is array like object
 * @param obj
 * @returns {boolean}
 */
export default function isArrayLike (obj){
    return (
        Array.isArray(obj) || (
            typeof obj === "object" &&
            "length" in obj &&
            typeof obj.length === "number" &&
            obj.length >= 0
        )
    );
}
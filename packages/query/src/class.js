export default class Query extends Array {
    constructor(sel, ctx) {
        super();


    }
}

export const $ = function(sel, ctx){
    return new Query(sel, ctx)
}

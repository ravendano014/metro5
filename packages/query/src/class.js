export default class Query extends Array {
    constructor(sel, ctx) {
        super();

        this._selector = sel
        this._context = ctx
    }
}

Query.use = function(...mixins){
    Object.assign(Query.prototype, ...mixins);
};

export const $ = function(sel, ctx){
    return new Query(sel, ctx)
}

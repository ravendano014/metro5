import Query from "./class.js"

const $ = function(sel, ctx){
    return new Query(sel, ctx)
}

export default Query
export { $ }
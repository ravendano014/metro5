import split from "../src/split/split"

describe('Split test', ()=>{
    it('Can be array with one value', ()=>{
        expect(split("test")).toEqual(["test"]);
        expect(split("test", "")).toEqual(["t","e","s","t"]);
        expect(split("test", " ")).toEqual(["test"]);
    })
})
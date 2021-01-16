import {lower, stripe} from "@metro5/cake";

export default function normalizeName(name){
    return lower(stripe(name, "-"))
}
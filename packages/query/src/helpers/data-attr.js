import {isNull} from "@metro5/utils";
import getData from "./get-data";
import {dataSet} from "../components/dataset";

export default function dataAttr(elem, key, data){
    let name;

    if ( isNull(data) && elem.nodeType === 1 ) {
        name = "data-" + key.replace( /[A-Z]/g, "-$&" ).toLowerCase();
        data = elem.getAttribute( name );

        if ( typeof data === "string" ) {
            data = getData( data );
            dataSet.set( elem, key, data );
        } else {
            data = undefined;
        }
    }
    return data;
}
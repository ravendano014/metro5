import Dataset from "../dataset"
import {isEmpty, isNull} from "@metro5/utils";
import {camelCase} from "@metro5/cake";
import dataAttr from "../helpers/data-attr";
import $ from "../$"

const dataSet  = new Dataset("metro5")

const Data = {
    data(key, val){
        let res, elem, data, attrs, name, i;

        if (this.length === 0) {
            return ;
        }

        elem = this[0];

        if ( arguments.length === 0 ) {
            if ( this.length ) {
                data = dataSet.get( elem );

                if ( elem.nodeType === 1) {
                    attrs = elem.attributes;
                    i = attrs.length;
                    while ( i-- ) {
                        if ( attrs[ i ] ) {
                            name = attrs[ i ].name;
                            if ( name.indexOf( "data-" ) === 0 ) {
                                name = camelCase( name.slice( 5 ) );
                                dataAttr( elem, name, data[ name ] );
                            }
                        }
                    }
                }
            }

            return data;
        }

        if ( arguments.length === 1 ) {
            res = dataSet.get(elem, key);
            if (res === undefined) {
                if ( elem.nodeType === 1) {
                    if (elem.hasAttribute("data-"+key)) {
                        res = elem.getAttribute("data-"+key);
                    }
                }
            }
            return res;
        }

        return this.each( function() {
            dataSet.set( this, key, val );
        } );
    },

    removeData( key ) {
        return this.each( function() {
            dataSet.remove( this, key );
        } );
    },

    origin(name, value, def){

        if (this.length === 0) {
            return this;
        }

        if (isNull(name) && isEmpty(value)) {
            return $.data(this[0]);
        }

        if (isNull(value)) {
            let res = $.data(this[0], "origin-"+name);
            return !!res ? res : def;
        }

        this.data("origin-"+name, value);

        return this;
    }
}

export default Data
export {
    dataSet
}
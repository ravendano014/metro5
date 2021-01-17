import {camelCase} from "@metro5/cake";
import {UID, isEmpty} from "@metro5/utils";

class Dataset {
    constructor(ns = "") {
        this.uid = UID('ds');
        this.timestamp = + new Date();
        this.ns = ns;
        this.dataset = "DATASET:" + ns.toUpperCase();
    }

    get UID(){
        return this.uid
    }

    get NS(){
        return this.ns
    }

    get TIMESTAMP(){
        return this.timestamp
    }

    canAcceptData(owner){
        return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
    }

    cache(owner){
        let value = owner[this.dataset];
        if (!value) {
            value = {};
            if (this.canAcceptData(owner)) {
                if (owner.nodeType) {
                    owner[this.dataset] = value;
                } else {
                    Object.defineProperty(owner, this.dataset, {
                        value: value,
                        configurable: true
                    });
                }
            }
        }
        return value;
    }

    set(owner, data, value){
        let prop;
        const cache = this.cache(owner);

        if (typeof data === "string") {
            cache[camelCase(data)] = value;
        } else {
            for (prop in data) {
                if (data.hasOwnProperty(prop))
                    cache[camelCase(prop)] = data[prop];
            }
        }
        return cache;
    }

    get(owner, key){
        return key === undefined ? this.cache(owner) : owner[ this.dataset ] && owner[ this.dataset ][ camelCase( key ) ];
    }

    access(owner, key, value){
        if (key === undefined || ((key && typeof key === "string") && value === undefined) ) {
            return this.get(owner, key);
        }
        this.set(owner, key, value);
        return value !== undefined ? value : key;
    }

    remove(owner, key){
        let i;
        const cache = owner[this.dataset];
        if (cache === undefined) {
            return ;
        }
        if (key !== undefined) {
            if ( Array.isArray( key ) ) {
                key = key.map( camelCase );
            } else {
                key = camelCase( key );

                key = key in cache ? [ key ] : ( key.match( /[^\x20\t\r\n\f]+/g ) || [] );
            }

            i = key.length;

            while ( i-- ) {
                delete cache[ key[ i ] ];
            }
        }
        if ( key === undefined || isEmpty( cache ) ) {
            if ( owner.nodeType ) {
                owner[ this.dataset ] = undefined;
            } else {
                delete owner[ this.dataset ];
            }
        }
        return true;
    }

    hasData(owner){
        const cache = owner[ this.dataset ];
        return cache !== undefined && !isEmpty( cache );
    }
}

export default Dataset;
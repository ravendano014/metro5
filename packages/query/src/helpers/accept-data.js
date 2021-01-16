export default function acceptData(owner){
    return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
}
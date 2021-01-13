export default function getColorArrayFromHex (val){
    const a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val ? val : "#000000");
    return a.slice(1).map((v) => parseInt(v, 16));
}
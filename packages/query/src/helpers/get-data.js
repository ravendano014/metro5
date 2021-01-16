export default function getData(data){
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}
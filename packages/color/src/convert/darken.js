import lighten from "./lighten";

export default function darken(color, amount){
    return lighten(color, -amount);
}
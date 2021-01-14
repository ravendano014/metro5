export default function shift(h, angle){
    h += angle;

    while (h >= 360.0) h -= 360.0;
    while (h < 0.0) h += 360.0;

    return h;
}

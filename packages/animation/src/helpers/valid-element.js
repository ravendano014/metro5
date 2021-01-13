export default function validElement(el) {
    return el instanceof HTMLElement || el instanceof SVGElement;
}
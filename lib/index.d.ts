/// <reference types="react" />
/**
 * @description Adds a KeyPress event listener, and on ctrl + shift + s opens a Save dialog and saves the SVG image as a PNG file.
 */
declare const useSaveSVG: () => import("react").RefObject<SVGSVGElement>;
export default useSaveSVG;

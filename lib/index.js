"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * @description Adds a KeyPress event listener, and on ctrl + shift + s opens a Save dialog and saves the SVG image as a PNG file.
 */
var useSaveSVG = function () {
    var ref = (0, react_1.useRef)(null);
    var saveSvg = function () { return __awaiter(void 0, void 0, void 0, function () {
        var svgText, svg, url_1, canvas_1, ctx_1, img_1;
        return __generator(this, function (_a) {
            if (ref.current) {
                svgText = new XMLSerializer().serializeToString(ref.current);
                svg = new Blob([svgText], { type: 'image/svg+xml;charset=ut6-8' });
                url_1 = window.URL.createObjectURL(svg);
                canvas_1 = document.createElement('canvas');
                canvas_1.width = ref.current.viewBox.baseVal.width;
                canvas_1.height = ref.current.viewBox.baseVal.height;
                ctx_1 = canvas_1.getContext('2d');
                img_1 = new Image();
                img_1.onload = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var image, fileHandle, writeable;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ctx_1 === null || ctx_1 === void 0 ? void 0 : ctx_1.drawImage(img_1, 0, 0);
                                    window.URL.revokeObjectURL(url_1);
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            canvas_1.toBlob(function (blob) {
                                                if (blob) {
                                                    resolve(blob);
                                                }
                                                else {
                                                    reject('failed to turn canvas to blob');
                                                }
                                            });
                                        })];
                                case 1:
                                    image = _a.sent();
                                    return [4 /*yield*/, showSaveFilePicker({
                                            //@ts-ignore
                                            suggestedName: 'Untitled.png',
                                            types: [
                                                { description: 'PNG file', accept: { 'image/png': ['.png'] } },
                                            ],
                                        })];
                                case 2:
                                    fileHandle = _a.sent();
                                    return [4 /*yield*/, fileHandle.createWritable()];
                                case 3:
                                    writeable = _a.sent();
                                    return [4 /*yield*/, writeable.write(image)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, writeable.close()];
                                case 5:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                img_1.src = url_1;
            }
            return [2 /*return*/];
        });
    }); };
    var handleKeyPressEvent = function (event) {
        var ctrlKey = event.ctrlKey, shiftKey = event.shiftKey, key = event.key;
        if (ctrlKey && shiftKey && key === 'S') {
            console.log('save');
            saveSvg();
        }
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener('keypress', handleKeyPressEvent);
        return function () { return document.removeEventListener('keypress', handleKeyPressEvent); };
    }, []);
    return ref;
};
exports.default = useSaveSVG;

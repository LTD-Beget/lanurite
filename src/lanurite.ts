import {Models} from "./type/Models";
import {Collections} from "./type/Collections";

declare const __VERSION__: string;

class Lanurite {
    static Models: any = Models;
    static Collections: any = Collections;
    static version: string = __VERSION__;

    constructor() {
    }
}

((root) => {
    root["lanurite"] = Lanurite;
})(window);

export {Lanurite};

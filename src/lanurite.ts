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

export {Lanurite};


if (typeof window != "undefined") {
    ((root) => {
        root["lanurite"] = Lanurite;
    })(window);
}
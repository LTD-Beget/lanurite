import {Models} from "./type/Models";
import {Collections} from "./type/Collections";

declare const __VERSION__: string;

((root) => {

    root["lanurite"] = {
        version: __VERSION__,
        Models: Models,
        Collections: Collections
    };


})(window);

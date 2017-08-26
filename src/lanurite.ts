import {Models} from "./model/Models";
import {Collections} from "./model/Collections";

declare const __VERSION__: string;

((root) => {

    root["lanurite"] = {
        version: __VERSION__,
        Models: Models,
        Collections: Collections
    };


})(window);

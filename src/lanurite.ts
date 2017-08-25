import {Models} from "./model/Models";
import {Collections} from "./model/Collections";
((root) => {

    root["lanurite"] = {
        version: "1.0.0",
        Models: Models,
        Collections: Collections
    }
})(window);
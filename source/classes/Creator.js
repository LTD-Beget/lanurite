"use strict";
exports.__esModule = true;
/**
 * Created by pyxru on 13.09.17.
 */
var ObjectCreator = (function () {
    function ObjectCreator() {
    }
    ObjectCreator.createEntity = function (type, param) {
        return new type();
    };
    return ObjectCreator;
}());
exports.ObjectCreator = ObjectCreator;
//# sourceMappingURL=Creator.js.map
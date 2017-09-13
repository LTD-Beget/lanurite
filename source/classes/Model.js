"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var _ = require("lodash");
var Event_1 = require("./Event");
var Model = (function (_super) {
    __extends(Model, _super);
    function Model(obj) {
        if (obj === void 0) { obj = {}; }
        var _this = _super.call(this) || this;
        _this._model = {};
        _this._model = _.assign({}, { l_id: _.uniqueId("lr_") }, obj);
        return _this;
    }
    Model.prototype.get = function (key) {
        return this._model[key];
    };
    Model.prototype.set = function (key, value) {
        if (this.has(key)) {
            var oldValue = this.get(key);
            this._model[key] = value;
            this.trigger("change", { name: key, value: value, oldValue: oldValue });
        }
        else {
            this._model[key] = value;
            this.trigger("set", { name: key, value: value });
        }
    };
    Model.prototype.has = function (key) {
        return !Event_1.Event._isUndefined(this._model[key]);
    };
    Model.prototype.toJSON = function () {
        return _.clone(this._model);
    };
    Model.prototype.drop = function (key) {
        if (this.has(key)) {
            delete this._model[key];
            return true;
        }
        return false;
    };
    Model.prototype.reset = function (object) {
        var oldValue = this.toJSON();
        if (Model.isModel(object)) {
            object = object.toJSON();
        }
        this._model = _.assign({}, object, { l_id: oldValue.l_id });
        this.trigger("reset", { value: this.toJSON(), oldValue: oldValue });
    };
    Model.prototype.destroy = function () {
        this.trigger("destroy");
        this._offAllListener();
        this._destroyModel();
    };
    Model.prototype._destroyModel = function () {
        delete this._model;
    };
    Model.isModel = function (object) {
        return object instanceof Model;
    };
    return Model;
}(Event_1.Event));
exports.Model = Model;
//# sourceMappingURL=Model.js.map
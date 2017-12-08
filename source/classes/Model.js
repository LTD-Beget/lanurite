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
var assign = require("lodash/assign");
var clone = require("lodash/clone");
var uniqueId = require("lodash/uniqueId");
var Event_1 = require("./Event");
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(obj) {
        if (obj === void 0) { obj = {}; }
        var _this = _super.call(this) || this;
        _this._model = {};
        _this._model = assign({}, { l_id: uniqueId("lr_") }, obj);
        return _this;
    }
    /**
     * Return private models
     * @returns {{[p: string]: any}}
     */
    Model.prototype.getModels = function () {
        return this._model;
    };
    /**
     * Get value by key
     * @param key
     * @returns {any}
     */
    Model.prototype.get = function (key) {
        return this._model[key];
    };
    /**
     * Set value on key in Models
     * @param key
     * @param value
     */
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
    /**
     * Checked key in Model
     * @param key
     * @returns {boolean}
     */
    Model.prototype.has = function (key) {
        return !Event_1.Event._isUndefined(this._model[key]);
    };
    /**
     * Get JSON from Model
     * @returns {{[p: string]: any}}
     */
    Model.prototype.toJSON = function () {
        return clone(this._model);
    };
    /**
     * Drop key from Model
     * @param key
     * @returns {boolean}
     */
    Model.prototype.drop = function (key) {
        if (this.has(key)) {
            delete this._model[key];
            return true;
        }
        return false;
    };
    /**
     * Reset Model by another value or Model
     * @param object
     */
    Model.prototype.reset = function (object) {
        var oldValue = this.toJSON();
        if (Model.isModel(object)) {
            object = object.toJSON();
        }
        this._model = assign({}, object, { l_id: oldValue.l_id });
        this.trigger("reset", { value: this.toJSON(), oldValue: oldValue });
    };
    /**
     * Destroy Model
     */
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
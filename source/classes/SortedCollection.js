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
var isFunction = require("lodash/isFunction");
var isString = require("lodash/isString");
var Collection_1 = require("./Collection");
var Model_1 = require("./Model");
var SortedCollection = (function (_super) {
    __extends(SortedCollection, _super);
    function SortedCollection(items, hashParam) {
        if (items === void 0) { items = []; }
        var _this = _super.call(this, [], hashParam) || this;
        _this.modelsArray = [];
        if (isString(hashParam)) {
            _this._uniqhash = hashParam;
        }
        _this.merge(items, { silent: true });
        return _this;
    }
    SortedCollection.prototype.sort = function (options) {
        if (options === void 0) { options = {}; }
        if (isFunction(this.comparator)) {
            this.modelsArray.sort(this.comparator);
            if (options.silent !== true) {
                this.trigger("sort");
            }
        }
    };
    SortedCollection.prototype.add = function (item, options, sort) {
        if (options === void 0) { options = {}; }
        if (sort === void 0) { sort = true; }
        var model = (item instanceof Model_1.Model) ? item : new Model_1.Model(item);
        if (_super.prototype.add.call(this, model, { silent: true })) {
            this.modelsArray.push(model);
            if (options.silent !== true) {
                this.trigger("add", model);
            }
            if (sort === true) {
                this.sort(options);
            }
            return true;
        }
        return false;
    };
    SortedCollection.prototype.remove = function (model, options) {
        if (options === void 0) { options = {}; }
        if (_super.prototype.remove.call(this, model, { silent: true })) {
            var index = this.modelsArray.indexOf(model);
            if (index > -1) {
                this.modelsArray.splice(index, 1);
            }
            if (options.silent !== true) {
                this.trigger("remove", model);
            }
            return true;
        }
        return false;
    };
    SortedCollection.prototype.reset = function (items, options) {
        if (items === void 0) { items = []; }
        if (options === void 0) { options = {}; }
        this.modelsArray = [];
        _super.prototype.reset.call(this, items, { silent: true });
        this.trigger("reset");
    };
    SortedCollection.prototype.merge = function (items, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        options = assign(options, { merge: true });
        items.forEach(function (item) {
            _this.add(item, options, false);
        });
        this.sort(options);
    };
    SortedCollection.prototype.getAll = function () {
        return this.modelsArray;
    };
    SortedCollection.prototype.getLength = function () {
        return this.modelsArray.length;
    };
    return SortedCollection;
}(Collection_1.Collection));
exports.SortedCollection = SortedCollection;
//# sourceMappingURL=SortedCollection.js.map
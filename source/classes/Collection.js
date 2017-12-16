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
var chunk = require("lodash/chunk");
var countBy = require("lodash/countBy");
var each = require("lodash/each");
var filter = require("lodash/filter");
var find = require("lodash/find");
var groupBy = require("lodash/groupBy");
var isArray = require("lodash/isArray");
var map = require("lodash/map");
var reduce = require("lodash/reduce");
var values = require("lodash/values");
var Event_1 = require("./Event");
var Model_1 = require("./Model");
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection(array, hashParam) {
        if (array === void 0) { array = []; }
        if (hashParam === void 0) { hashParam = "l_id"; }
        var _this = _super.call(this) || this;
        _this._models = {};
        _this._uniqhash = "l_id";
        _this._uniqhash = hashParam;
        _this._init(array);
        return _this;
    }
    Collection.prototype._init = function (array) {
        var _this = this;
        each(array, function (object) {
            if (Model_1.Model.isModel(object)) {
                _this._models[object.get(_this._uniqhash)] = object;
                return;
            }
            var model = new Model_1.Model(object);
            _this._models[model.get(_this._uniqhash)] = model;
        });
    };
    Collection.prototype._clearCollection = function () {
        var _this = this;
        each(Object.keys(this._models), function (key) {
            delete _this._models[key];
        });
    };
    Collection.prototype.getUniqHash = function () {
        return this._uniqhash;
    };
    /**
     * Add Model to Collection
     * @param model
     * @param needReset
     * @returns {boolean}
     */
    Collection.prototype.add = function (model, needReset) {
        if (needReset === void 0) { needReset = false; }
        if (Model_1.Model.isModel(model)) {
            if (Event_1.Event._isUndefined(this._models[model.get(this._uniqhash)])) {
                this._models[model.get(this._uniqhash)] = model;
                this.trigger("add", model);
                return true;
            }
            else {
                if (needReset) {
                    this.getByHash(this._uniqhash).reset(model);
                }
            }
        }
        return false;
    };
    /**
     * Remove Model from Collection
     * @param model
     * @returns {boolean}
     */
    Collection.prototype.remove = function (model) {
        if (Model_1.Model.isModel(model)) {
            if (!Event_1.Event._isUndefined(this._models[model.get(this._uniqhash)])) {
                delete this._models[model.get(this._uniqhash)];
                this.trigger("remove", model);
                return true;
            }
        }
        return false;
    };
    /**
     * Check existing Model in Collection
     * @param model
     * @returns {boolean}
     */
    Collection.prototype.has = function (model) {
        return !Event_1.Event._isUndefined(this._models[model.get(this._uniqhash)]);
    };
    /**
     * Clear Collection, events will be saving
     */
    Collection.prototype.clear = function () {
        this._clearCollection();
        this.trigger("clear");
    };
    /**
     * Filtering collection by predicate
     * @param predicate
     * @returns {Array}
     */
    Collection.prototype.filter = function (predicate) {
        return filter(this.getAll(), predicate);
    };
    /**
     * Create new Array from Collection
     * @param predicate
     * @returns {Array}
     */
    Collection.prototype.map = function (predicate) {
        return map(this.getAll(), predicate);
    };
    /**
     * Get Model by hash
     * @param hash
     * @returns {any}
     */
    Collection.prototype.getByHash = function (hash) {
        if (!Event_1.Event._isUndefined(this._models[hash])) {
            return this._models[hash];
        }
        return null;
    };
    /**
     * Find by predicate in Collection
     * @param predicate
     * @param startIndex
     * @returns {undefined|S}
     */
    Collection.prototype.find = function (predicate, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return find(this.getAll(), predicate, startIndex);
    };
    /**
     * Reduce new Collection
     * @param predicate
     * @param accum
     * @returns {{}|undefined|null}
     */
    Collection.prototype.reduce = function (predicate, accum) {
        if (accum === void 0) { accum = 0; }
        return reduce(this.getAll(), predicate, accum);
    };
    /**
     * Get Array from Collection
     * @returns {Array}
     */
    Collection.prototype.getAll = function () {
        return values(this._models);
    };
    /**
     * Iterate collection by predicate
     * @param predicate
     */
    Collection.prototype.each = function (predicate) {
        each(this.getAll(), predicate);
    };
    /**
     * Merge collection with array or another collection
     * @param collection
     */
    Collection.prototype.merge = function (collection) {
        var _this = this;
        if (isArray(collection)) {
            each(collection, function (object) {
                if (Model_1.Model.isModel(object)) {
                    return _this.add(object);
                }
                var model = new Model_1.Model(object);
                _this.add(model, true);
            });
            return;
        }
        each(collection.getAll(), function (model) {
            _this.add(model, true);
        });
    };
    /**
     * Reset Collection with new Array of Model or JSON
     * @param array
     * @param options
     */
    Collection.prototype.reset = function (array, options) {
        if (array === void 0) { array = []; }
        if (options === void 0) { options = {}; }
        this._clearCollection();
        this._init(array);
        if (options.silent === true) {
            return;
        }
        this.trigger("reset");
    };
    /**
     * Get Collection length
     * @returns {number}
     */
    Collection.prototype.getLength = function () {
        return Object.keys(this._models).length;
    };
    /**
     * Return JSOn from Collection
     * @returns {Array}
     */
    Collection.prototype.toJSON = function () {
        return map(this.getAll(), function (el) {
            return el.toJSON();
        });
    };
    /**
     * Sort element with predicate
     * @param predicate
     */
    Collection.prototype.sortBy = function (predicate) {
        this.reset(this.getAll().sort(predicate));
    };
    /**
     * Get Array from Collection
     * @returns {Array}
     */
    Collection.prototype.toArray = function () {
        return this.getAll();
    };
    /**
     * Chunk Array on size
     * @param size
     * @returns {Array<Array>}
     */
    Collection.prototype.chunk = function (size) {
        if (size === void 0) { size = 1; }
        return chunk(this.getAll(), size);
    };
    /**
     * Count element by predicate
     * @param predicate
     * @returns {Dictionary<number>}
     */
    Collection.prototype.countBy = function (predicate) {
        return countBy(this.getAll(), predicate);
    };
    /**
     * Group Collection ny predicate
     * @param predicate
     * @returns {Dictionary<({}|undefined|null)[]>}
     */
    Collection.prototype.groupBy = function (predicate) {
        return groupBy(this.getAll(), predicate);
    };
    /**
     * Create clone of original collection
     * @returns {Collection<T extends IModel>}
     */
    Collection.prototype.clone = function () {
        return new this.constructor(this.getAll());
    };
    /**
     * Destroy Collection
     */
    Collection.prototype.destroy = function () {
        this.trigger("destroy");
        this._offAllListener();
        this._destroyCollection();
    };
    Collection.prototype._destroyCollection = function () {
        delete this._models;
    };
    return Collection;
}(Event_1.Event));
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map
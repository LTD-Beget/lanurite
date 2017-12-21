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
var isUndefined = require("lodash/isUndefined");
var map = require("lodash/map");
var reduce = require("lodash/reduce");
var values = require("lodash/values");
var Event_1 = require("./Event");
var Model_1 = require("./Model");
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(models, hashParam) {
        if (models === void 0) { models = []; }
        if (hashParam === void 0) { hashParam = "l_id"; }
        var _this = _super.call(this) || this;
        _this._models = {};
        _this._uniqhash = "l_id";
        _this._uniqhash = hashParam;
        _this.merge(models, { silent: true });
        return _this;
    }
    Collection.prototype._clearCollection = function () {
        var _this = this;
        each(Object.keys(this._models), function (key) {
            delete _this._models[key];
        });
    };
    /**
     * Add Model to Collection
     * @param item
     * @param options
     * @returns {boolean}
     */
    Collection.prototype.add = function (item, options) {
        if (options === void 0) { options = {}; }
        var model = (item instanceof Model_1.Model) ? item : new Model_1.Model(item);
        var hash = model.get(this._uniqhash);
        var existModel = this.findByHash(hash);
        if (!existModel) {
            this._models[hash] = model;
            if (options.silent !== true) {
                this.trigger("add", model);
            }
            return true;
        }
        if (existModel && options.merge === true) {
            existModel.reset(model);
        }
        return false;
    };
    /**
     * Remove Model from Collection
     * @param model
     * @param options
     * @returns {boolean}
     */
    Collection.prototype.remove = function (model, options) {
        if (options === void 0) { options = {}; }
        if (!(model instanceof Model_1.Model)) {
            throw new Error("model isn't instance of Model");
        }
        var hash = model.get(this._uniqhash);
        if (this.findByHash(hash)) {
            delete this._models[hash];
            if (options.silent !== true) {
                this.trigger("remove", model);
            }
            return true;
        }
        return false;
    };
    /**
     * Check existing Model in Collection
     * @param model
     * @returns {boolean}
     */
    Collection.prototype.has = function (model) {
        if (!(model instanceof Model_1.Model)) {
            throw new Error("model isn't instance of Model");
        }
        var hash = model.get(this._uniqhash);
        return !!this.findByHash(hash);
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
     * find Model by hash
     * @param hash
     * @returns {T}
     */
    Collection.prototype.findByHash = function (hash) {
        return !isUndefined(this._models[hash]) ? this._models[hash] : null;
    };
    /**
     * Find by predicate in Collection
     * @param predicate
     * @param startIndex
     * @returns {undefined|T}
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
     * @param items
     * @param options
     */
    Collection.prototype.merge = function (items, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        items.forEach(function (item) {
            _this.add(item, options);
        });
    };
    /**
     * Reset Collection with new Array of Model or JSON
     * @param items
     * @param options
     */
    Collection.prototype.reset = function (items, options) {
        if (items === void 0) { items = []; }
        if (options === void 0) { options = {}; }
        this._clearCollection();
        this.merge(items, { silent: true });
        if (options.silent !== true) {
            this.trigger("reset");
        }
    };
    Collection.prototype.getHashName = function () {
        return this._uniqhash;
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
     * @returns {Collection<T>}
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
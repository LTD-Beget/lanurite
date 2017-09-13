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
var Model_1 = require("./Model");
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(array) {
        if (array === void 0) { array = []; }
        var _this = _super.call(this) || this;
        _this._models = {};
        _this._init(array);
        return _this;
    }
    Collection.prototype._init = function (array) {
        var _this = this;
        _.each(array, function (object) {
            if (Model_1.Model.isModel(object)) {
                _this._models[object.get("l_id")] = object;
                return;
            }
            if (_.isFunction(_this.Type)) {
                var typedModel = new _this.Type(object);
                _this._models[typedModel.get("l_id")] = typedModel;
                return;
            }
            var model = new Model_1.Model(object);
            _this._models[model.get("l_id")] = model;
        });
    };
    Collection.prototype._clearCollection = function () {
        var _this = this;
        Object.keys(this._models).forEach(function (key) {
            delete _this._models[key];
        });
    };
    /**
     * Add Model to Collection
     * @param model
     * @returns {boolean}
     */
    Collection.prototype.add = function (model) {
        if (Model_1.Model.isModel(model)) {
            if (Event_1.Event._isUndefined(this._models[model.get("l_id")])) {
                this._models[model.get("l_id")] = model;
                this.trigger("add", model);
                return true;
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
            if (!Event_1.Event._isUndefined(this._models[model.get("l_id")])) {
                delete this._models[model.get("l_id")];
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
        return !Event_1.Event._isUndefined(this._models[model.get("l_id")]);
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
     * @returns {S[]}
     */
    Collection.prototype.filter = function (predicate) {
        return _.filter(this.getAll(), predicate);
    };
    /**
     * Create new Array from Collection
     * @param predicate
     * @returns {TResult[]}
     */
    Collection.prototype.map = function (predicate) {
        return _.map(this.getAll(), predicate);
    };
    /**
     * Get Model by Id
     * @param id
     * @returns {any}
     */
    Collection.prototype.getById = function (id) {
        if (!Event_1.Event._isUndefined(this._models[id])) {
            return this._models[id];
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
        return _.find(this.getAll(), predicate, startIndex);
    };
    /**
     * Reduce new Collection
     * @param predicate
     * @param accum
     * @returns {{}|undefined|null}
     */
    Collection.prototype.reduce = function (predicate, accum) {
        if (accum === void 0) { accum = 0; }
        return _.reduce(this.getAll(), predicate, accum);
    };
    /**
     * Get Array from Collection
     * @returns {T[]}
     */
    Collection.prototype.getAll = function () {
        return _.values(this._models);
    };
    /**
     * Iterate collection by predicate
     * @param predicate
     * @returns {any}
     */
    Collection.prototype.each = function (predicate) {
        return _.each(this.getAll(), predicate);
    };
    /**
     * Merge collection with array or another collection
     * @param collection
     * @returns {any}
     */
    Collection.prototype.merge = function (collection) {
        var _this = this;
        if (_.isArray(collection)) {
            return _.each(collection, function (object) {
                if (Model_1.Model.isModel(object)) {
                    return _this.add(object);
                }
                if (_.isFunction(_this.Type)) {
                    var typedModel = new _this.Type(object);
                    _this.add(typedModel);
                    return;
                }
                var model = new Model_1.Model(object);
                _this.add(model);
            });
        }
        _.each(collection.getAll(), function (model) {
            _this.add(model);
        });
    };
    /**
     * Reset Collection with new Array of Model or JSON
     * @param array
     */
    Collection.prototype.reset = function (array) {
        if (array === void 0) { array = []; }
        this._clearCollection();
        this._init(array);
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
     * @returns {any[]}
     */
    Collection.prototype.toJSON = function () {
        return _.map(this.getAll(), function (el) {
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
     * @returns {T[]}
     */
    Collection.prototype.toArray = function () {
        return this.getAll();
    };
    /**
     * Chunk Array on size
     * @param size
     * @returns {T[][]}
     */
    Collection.prototype.chunk = function (size) {
        if (size === void 0) { size = 1; }
        return _.chunk(this.getAll(), size);
    };
    /**
     * Count element by predicate
     * @param predicate
     * @returns {Dictionary<number>}
     */
    Collection.prototype.countBy = function (predicate) {
        return _.countBy(this.getAll(), predicate);
    };
    /**
     * Group Collection ny predicate
     * @param predicate
     * @returns {Dictionary<({}|undefined|null)[]>}
     */
    Collection.prototype.groupBy = function (predicate) {
        return _.groupBy(this.getAll(), predicate);
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
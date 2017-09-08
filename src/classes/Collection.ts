import * as _ from "lodash";
import {ICollection} from "../interfaces/ICollection";
import {Event} from "./Event"
import {IModel} from "../interfaces/IModel";
import {Model} from "./Model";


class Collection extends Event implements ICollection {
    private _models: any = {};

    constructor(array: Array<any> = []) {
        super();
        this._init(array)
    }

    private _init(array: Array<any>) {
        array.forEach((object) => {
            if (this._isModel(object)) {
                return this._models[object.get("l_id")] = object
            }
            let model = new Model(object);
            this._models[model.get("l_id")] = model
        })
    }

    /**
     * Add model in collection, return True if model added or False if model already in collection
     * @param model
     * @returns {boolean}
     */

    add(model: IModel) {
        if (_.isUndefined(this._models[model.get("l_id")])) {
            this._models[model.get("l_id")] = model;
            this.trigger("add", model);
            return true
        }
        return false
    }

    /**
     * Remove model from collection, return true if model removed or False if model not in collection
     * @param model
     * @returns {boolean}
     */

    remove(model: IModel) {
        if (!_.isUndefined(this._models[model.get("l_id")])) {
            delete this._models[model.get("l_id")]
            this.trigger("remove", model);
            return true
        }
        return false
    }

    /**
     * Return existing model in collection
     * @param model
     * @returns {boolean}
     */

    has(model: IModel) {
        return !_.isUndefined(this._models[model.get("l_id")])
    }

    /**
     * Clear collection, remove all models, event will be save
     */

    clear() {
        this._clearCollection();
        this.trigger("clear");
    }

    /**
     * Filtering collection with predicate
     * @param predicate - function
     * @returns {Array<any>}
     */

    filter(predicate: any): Array<any> {
        return this.getAll().filter(predicate)
    }

    /**
     * Create new array with predicate
     * @param predicate - function
     * @returns {Array<any>}
     */

    map(predicate: any): Array<any> {
        return this.getAll().map(predicate)
    }

    /**
     * Get Model by id
     * @param id
     * @returns Model | null
     */

    getById(id: string) {
        if (!_.isUndefined(this._models[id])) {
            return this._models[id]
        }
        return null;
    }

    /**
     * Find first model filtering by predicate
     * @param predicate - function
     * @param startIndex - number start index
     * @returns {Model|undefined}
     */

    find(predicate: any, startIndex: number = 0): any {
        return _.find(this.getAll(), predicate, startIndex);
    }

    /**
     * Accumulation collection with predicate
     * @param predicate - function
     * @param accum
     * @returns {any}
     */

    reduce(predicate: any, accum: any = 0): any {
        return this.getAll().reduce(predicate, accum)
    }

    /**
     * Return Array of Model
     * @returns {Array[Model]}
     */

    getAll(): Array<any> {
        return _.values(this._models)
    }

    private _isModel(object: any) {
        return object instanceof Model
    }

    /**
     * Iterate collection with predicate
     * @param predicate - function
     */

    each(predicate: any) {
        return this.getAll().forEach(predicate)
    }

    /**
     * Merge collection with Array<any> or Array<Model>
     * @param collection
     */

    merge(collection: Array<any> | ICollection) {
        if (_.isArray(collection)) {
            return collection.forEach((object) => {
                if (this._isModel(object)) {
                    return this.add(object);
                }
                let model = new Model(object);
                this.add(model);
            })
        }
        collection.getAll().forEach((model) => {
            this.add(model);
        })

    }

    /**
     * Reset collection with new data array, events will be save
     * @param array
     */
    reset(array: Array<any> = []) {
        this._clearCollection();
        this._init(array);
        this.trigger("reset");
    }

    private _clearCollection() {
        Object.keys(this._models).forEach((key) => {
            delete this._models[key]
        });
    }

    /**
     * Get collection length
     * @returns {number}
     */
    getLength(): number {
        return Object.keys(this._models).length
    }

    /**
     * Get JSON from collection
     * @returns {Array<any>}
     */

    toJSON() {
        return this.map((el) => {
            return el.toJSON()
        })
    }

    /**
     * Sorting collection with predicate, changing collection order.
     * @param predicate - function
     */

    sortBy(predicate: any) {
        this.reset(this.getAll().sort(predicate))
    }

    /**
     * Return Array of Model
     * @returns {Array<any>}
     */
    toArray(): Array<any> {
        return this.getAll()
    }

    /**
     * Creates an collection of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
     * @param size
     * @returns {Array<any>}
     */
    chunk(size: number = 1): Array<any> {
        return _.chunk(this.getAll(), size)
    }

    /**
     * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number of times the key was returned by iteratee.
     * @param predicate - function
     * @returns {Dictionary<number>}
     */

    countBy(predicate: any) {
        return _.countBy(this.getAll(), predicate);
    }

    /**
     * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the order they occur in collection. The corresponding value of each key is an array of elements responsible for generating the key.
     * @param predicate - function
     * @returns {Dictionary<T[]>}
     */
    groupBy(predicate: any) {
        return _.groupBy(this.getAll(), predicate);
    }
}


export {Collection}
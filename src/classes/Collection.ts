import * as _ from "lodash"
import {Dictionary} from "lodash"
import {ICollection} from "../interfaces/ICollection"
import {IModel} from "../interfaces/IModel"
import {Event} from "./Event"
import {Model} from "./Model"

class Collection<T extends IModel> extends Event implements ICollection<T> {

    private _models: any = {}

    constructor(array: Array<any> = []) {
        super()
        this._init(array)
    }

    private _init(array: Array<any>) {
        array.forEach((object) => {
            if (this._isModel(object)) {
                return this._models[object.get("l_id")] = object
            }
            const model = new Model(object)
            this._models[model.get("l_id")] = model
        })
    }

    private _isModel(object: any) {
        return object instanceof Model
    }

    private _clearCollection() {
        Object.keys(this._models).forEach((key) => {
            delete this._models[key]
        })
    }

    /**
     * Add model in collection, return True if model added or False if model already in collection
     * @param model
     * @returns {boolean}
     */

    public add(model: T | IModel) {
        if (_.isUndefined(this._models[model.get("l_id")])) {
            this._models[model.get("l_id")] = model
            this.trigger("add", model)
            return true
        }
        return false
    }

    /**
     * Remove model from collection, return true if model removed or False if model not in collection
     * @param model
     * @returns {boolean}
     */

    public remove(model: T) {
        if (!_.isUndefined(this._models[model.get("l_id")])) {
            delete this._models[model.get("l_id")]
            this.trigger("remove", model)
            return true
        }
        return false
    }

    /**
     * Return existing model in collection
     * @param model
     * @returns {boolean}
     */

    public has(model: T) {
        return !_.isUndefined(this._models[model.get("l_id")])
    }

    /**
     * Clear collection, remove all models, event will be save
     */

    public clear() {
        this._clearCollection()
        this.trigger("clear")
    }

    /**
     * Filtering collection with predicate
     * @param predicate - function
     * @returns {Array<T>}
     */

    public filter(predicate: any): Array<T> {
        return this.getAll().filter(predicate)
    }

    /**
     * Create new array with predicate
     * @param predicate - function
     * @returns {Array<T>}
     */

    public map(predicate: any): Array<T> {
        return this.getAll().map(predicate)
    }

    /**
     * Get Model by id
     * @param id
     * @returns Model | null
     */

    public getById(id: string) {
        if (!_.isUndefined(this._models[id])) {
            return this._models[id]
        }
        return null
    }

    /**
     * Find first model filtering by predicate
     * @param predicate - function
     * @param startIndex - number start index
     * @returns {Model|undefined}
     */

    public find(predicate: any, startIndex: number = 0): T | undefined {
        return _.find(this.getAll(), predicate, startIndex)
    }

    /**
     * Accumulation collection with predicate
     * @param predicate - function
     * @param accum
     * @returns {any}
     */

    public reduce(predicate: any, accum: any = 0): any {
        return this.getAll().reduce(predicate, accum)
    }

    /**
     * Return Array of Model
     * @returns {Array[Model]}
     */

    public getAll(): Array<T> {
        return _.values(this._models)
    }

    /**
     * Iterate collection with predicate
     * @param predicate - function
     */

    public each(predicate: any) {
        return this.getAll().forEach(predicate)
    }

    /**
     * Merge collection with Array<T> or Array<Model>
     * @param collection
     */

    public merge(collection: Array<T> | ICollection<T>) {
        if (_.isArray(collection)) {
            return collection.forEach((object) => {
                if (this._isModel(object)) {
                    return this.add(object)
                }
                const model = new Model(object)
                this.add(model)
            })
        }
        collection.getAll().forEach((model) => {
            this.add(model)
        })

    }

    /**
     * Reset collection with new data array, events will be save
     * @param array
     */
    public reset(array: Array<any> = []) {
        this._clearCollection()
        this._init(array)
        this.trigger("reset")
    }

    /**
     * Get collection length
     * @returns {number}
     */
    public getLength(): number {
        return Object.keys(this._models).length
    }

    /**
     * Get JSON from collection
     * @returns {Array<T>}
     */

    public toJSON(): any {
        return this.map((el) => {
            return el.toJSON()
        })
    }

    /**
     * Sorting collection with predicate, changing collection order.
     * @param predicate - function
     */

    public sortBy(predicate: any): void {
        this.reset(this.getAll().sort(predicate))
    }

    /**
     * Return Array of Model
     * @returns {Array<T>}
     */
    public toArray(): Array<T> {
        return this.getAll()
    }

    /**
     * Creates an collection of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
     * @param size
     * @returns {Array<T>}
     */
    public chunk(size: number = 1): Array<Array<T>> {
        return _.chunk(this.getAll(), size)
    }

    /**
     * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number
     * of times the key was returned by iteratee.
     * @param predicate - function
     * @returns {Dictionary<number>}
     */

    public countBy(predicate: any): Dictionary<number> {
        return _.countBy(this.getAll(), predicate)
    }

    /**
     * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the
     * order they occur in collection. The corresponding value of each key is an array of elements responsible for generating the key.
     * @param predicate - function
     * @returns {Dictionary<Array<T>>}
     */
    public groupBy(predicate: any): Dictionary<Array<T>> {
        return _.groupBy(this.getAll(), predicate)
    }

    /**
     * Destoy Collection remove all event and trigger destroy
     * @returns {Collection}
     */
    public destroy() {
        this.trigger("destroy")
        this._offAllListener()
        this._destroyCollection()
        return this
    }

    private _destroyCollection() {
        delete this._models
    }

}

export {Collection}
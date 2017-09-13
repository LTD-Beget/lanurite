import * as _ from "lodash"
import {ICollection} from "../interfaces/ICollection"
import {IModel} from "../interfaces/IModel"
import {IPredicate} from "../interfaces/IPredicate"
import {Event} from "./Event"
import {Model} from "./Model"

class Collection<T extends IModel> extends Event implements ICollection<T> {
    private Type: new (param: any) => T

    private _models: { [key: string]: T | IModel } = {}

    constructor(array: any[] | T[] = []) {
        super()
        this._init(array)
    }

    private _init(array: T[] | any[]) {
        _.each(array, (object) => {
            if (Model.isModel(object)) {
                this._models[object.get("l_id")] = object
                return
            }
            if (_.isFunction(this.Type)) {
                const typedModel = new this.Type(object)
                this._models[typedModel.get("l_id")] = typedModel
                return
            }
            const model = new Model(object)
            this._models[model.get("l_id")] = model
        })
    }

    private _clearCollection() {
        Object.keys(this._models).forEach((key) => {
            delete this._models[key]
        })
    }

    /**
     * Add Model to Collection
     * @param model
     * @returns {boolean}
     */
    public add(model: T | IModel) {
        if (Model.isModel(model)) {
            if (Event._isUndefined(this._models[model.get("l_id")])) {
                this._models[model.get("l_id")] = model
                this.trigger("add", model)
                return true
            }
        }
        return false
    }

    /**
     * Remove Model from Collection
     * @param model
     * @returns {boolean}
     */
    public remove(model: T | IModel) {
        if (Model.isModel(model)) {
            if (!Event._isUndefined(this._models[model.get("l_id")])) {
                delete this._models[model.get("l_id")]
                this.trigger("remove", model)
                return true
            }
        }
        return false
    }

    /**
     * Check existing Model in Collection
     * @param model
     * @returns {boolean}
     */
    public has(model: T | IModel) {
        return !Event._isUndefined(this._models[model.get("l_id")])
    }

    /**
     * Clear Collection, events will be saving
     */
    public clear() {
        this._clearCollection()
        this.trigger("clear")
    }

    /**
     * Filtering collection by predicate
     * @param predicate
     * @returns {S[]}
     */
    public filter(predicate: IPredicate): T[] {
        return _.filter<T>(this.getAll(), predicate)
    }

    /**
     * Create new Array from Collection
     * @param predicate
     * @returns {TResult[]}
     */
    public map(predicate: IPredicate): any[] {
        return _.map(this.getAll(), predicate)
    }

    /**
     * Get Model by Id
     * @param id
     * @returns {any}
     */
    public getById(id: string): T | IModel {
        if (!Event._isUndefined(this._models[id])) {
            return this._models[id]
        }
        return null
    }

    /**
     * Find by predicate in Collection
     * @param predicate
     * @param startIndex
     * @returns {undefined|S}
     */
    public find(predicate: IPredicate, startIndex: number = 0): T | undefined {
        return _.find<T>(this.getAll(), predicate, startIndex)
    }

    /**
     * Reduce new Collection
     * @param predicate
     * @param accum
     * @returns {{}|undefined|null}
     */
    public reduce(predicate: IPredicate, accum: any = 0): any {
        return _.reduce(this.getAll(), predicate, accum)
    }

    /**
     * Get Array from Collection
     * @returns {T[]}
     */
    public getAll(): T[] {
        return _.values<T>(this._models)
    }

    /**
     * Iterate collection by predicate
     * @param predicate
     * @returns {any}
     */
    public each(predicate: IPredicate) {
        return _.each(this.getAll(), predicate)
    }

    /**
     * Merge collection with array or another collection
     * @param collection
     * @returns {any}
     */
    public merge(collection: T[] | ICollection<T> | any[]) {
        if (_.isArray(collection)) {
            return _.each(collection, (object) => {
                if (Model.isModel(object)) {
                    return this.add(object)
                }
                if (_.isFunction(this.Type)) {
                    const typedModel = new this.Type(object)
                    this.add(typedModel)
                    return
                }
                const model = new Model(object)
                this.add(model)
            })
        }
        _.each(collection.getAll(), (model) => {
            this.add(model)
        })

    }

    /**
     * Reset Collection with new Array of Model or JSON
     * @param array
     */
    public reset(array: any[] | T[] = []) {
        this._clearCollection()
        this._init(array)
        this.trigger("reset")
    }

    /**
     * Get Collection length
     * @returns {number}
     */
    public getLength(): number {
        return Object.keys(this._models).length
    }

    /**
     * Return JSOn from Collection
     * @returns {any[]}
     */
    public toJSON(): any {
        return _.map(this.getAll(), (el) => {
            return el.toJSON()
        })
    }

    /**
     * Sort element with predicate
     * @param predicate
     */
    public sortBy(predicate: IPredicate): void {
        this.reset(this.getAll().sort(predicate))
    }

    /**
     * Get Array from Collection
     * @returns {T[]}
     */
    public toArray(): T[] {
        return this.getAll()
    }

    /**
     * Chunk Array on size
     * @param size
     * @returns {T[][]}
     */
    public chunk(size: number = 1): T[][] {
        return _.chunk(this.getAll(), size)
    }

    /**
     * Count element by predicate
     * @param predicate
     * @returns {Dictionary<number>}
     */
    public countBy(predicate: IPredicate): { [key: string]: number } {
        return _.countBy(this.getAll(), predicate)
    }

    /**
     * Group Collection ny predicate
     * @param predicate
     * @returns {Dictionary<({}|undefined|null)[]>}
     */
    public groupBy(predicate: IPredicate): { [key: string]: T[] } {
        return _.groupBy<T>(this.getAll(), predicate)
    }

    /**
     * Destroy Collection
     */
    public destroy(): void {
        this.trigger("destroy")
        this._offAllListener()
        this._destroyCollection()
    }

    private _destroyCollection() {
        delete this._models
    }

}

export {Collection}
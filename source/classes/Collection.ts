import chunk = require("lodash/chunk")
import countBy = require("lodash/countBy")
import each = require("lodash/each")
import filter = require("lodash/filter")
import find = require("lodash/find")
import groupBy = require("lodash/groupBy")
import isArray = require("lodash/isArray")
import map = require("lodash/map")
import reduce = require("lodash/reduce")
import values = require("lodash/values")
import { ICollection } from "../interfaces/ICollection"
import { IModel } from "../interfaces/IModel"
import { IOptions } from "../interfaces/IOptions"
import { IPredicate } from "../interfaces/IPredicate"
import { Event } from "./Event"
import { Model } from "./Model"

export class Collection<T extends IModel> extends Event implements ICollection<T> {

    private _models: { [key: string]: T | IModel } = {}
    private _uniqhash: string = "l_id"

    constructor(array: Array<T | any> = [], hashParam: string = "l_id") {
        super()
        this._uniqhash = hashParam
        this._init(array)

    }

    private _init(array: Array<T | any>): void {
        each(array, (object) => {
            if (Model.isModel(object)) {
                this._models[object.get(this._uniqhash)] = object
                return
            }
            const model = new Model<T>(object)
            this._models[model.get(this._uniqhash)] = model
        })
    }

    private _clearCollection(): void {
        each(Object.keys(this._models), (key) => {
            delete this._models[key]
        })
    }

    public getUniqHash(): string {
        return this._uniqhash
    }

    /**
     * Add Model to Collection
     * @param model
     * @param needReset
     * @returns {boolean}
     */
    public add(model: T | IModel, needReset = false): boolean {
        if (Model.isModel(model)) {
            if (Event._isUndefined(this._models[model.get(this._uniqhash)])) {
                this._models[model.get(this._uniqhash)] = model
                this.trigger("add", model)
                return true
            } else {
                if (needReset) {
                    this.getByHash(this._uniqhash).reset(model)
                }
            }
        }
        return false
    }

    /**
     * Remove Model from Collection
     * @param model
     * @returns {boolean}
     */
    public remove(model: T | IModel): boolean {
        if (Model.isModel(model)) {
            if (!Event._isUndefined(this._models[model.get(this._uniqhash)])) {
                delete this._models[model.get(this._uniqhash)]
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
    public has(model: T | IModel): boolean {
        return !Event._isUndefined(this._models[model.get(this._uniqhash)])
    }

    /**
     * Clear Collection, events will be saving
     */
    public clear(): void {
        this._clearCollection()
        this.trigger("clear")
    }

    /**
     * Filtering collection by predicate
     * @param predicate
     * @returns {Array}
     */
    public filter(predicate: IPredicate): Array<T> {
        return filter<T>(this.getAll(), predicate)
    }

    /**
     * Create new Array from Collection
     * @param predicate
     * @returns {Array}
     */
    public map(predicate: IPredicate): Array<any> {
        return map(this.getAll(), predicate)
    }

    /**
     * Get Model by hash
     * @param hash
     * @returns {any}
     */
    public getByHash(hash: string|number): T | IModel | null {
        if (!Event._isUndefined(this._models[hash])) {
            return this._models[hash]
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
        return find<T>(this.getAll(), predicate, startIndex)
    }

    /**
     * Reduce new Collection
     * @param predicate
     * @param accum
     * @returns {{}|undefined|null}
     */
    public reduce(predicate: IPredicate, accum: any = 0): {} | undefined | null {
        return reduce(this.getAll(), predicate, accum)
    }

    /**
     * Get Array from Collection
     * @returns {Array}
     */
    public getAll(): Array<T> {
        return values<T>(this._models)
    }

    /**
     * Iterate collection by predicate
     * @param predicate
     */
    public each(predicate: IPredicate): void {
        each(this.getAll(), predicate)
    }

    /**
     * Merge collection with array or another collection
     * @param collection
     */
    public merge(collection: Array<T | any>| ICollection<T>): void {
        if (isArray(collection)) {
            each(collection, (object) => {
                if (Model.isModel(object)) {
                    return this.add(object)
                }
                const model = new Model<T>(object)
                this.add(model, true)
            })
            return
        }
        each(collection.getAll(), (model) => {
            this.add(model, true)
        })

    }

    /**
     * Reset Collection with new Array of Model or JSON
     * @param array
     * @param options
     */
    public reset(array: Array<T | any> = [], options: IOptions = {}): void {
        this._clearCollection()
        this._init(array)
        if (options.silent === true) {
            return
        }
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
     * @returns {Array}
     */
    public toJSON(): Array<any> {
        return map(this.getAll(), (el) => {
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
     * @returns {Array}
     */
    public toArray(): Array<T> {
        return this.getAll()
    }

    /**
     * Chunk Array on size
     * @param size
     * @returns {Array<Array>}
     */
    public chunk(size: number = 1): Array<Array<T>> {
        return chunk(this.getAll(), size)
    }

    /**
     * Count element by predicate
     * @param predicate
     * @returns {Dictionary<number>}
     */
    public countBy(predicate: IPredicate): { [key: string]: number } {
        return countBy(this.getAll(), predicate)
    }

    /**
     * Group Collection ny predicate
     * @param predicate
     * @returns {Dictionary<({}|undefined|null)[]>}
     */
    public groupBy(predicate: IPredicate): { [key: string]: Array<T> } {
        return groupBy<T>(this.getAll(), predicate)
    }

    /**
     * Create clone of original collection
     * @returns {Collection<T extends IModel>}
     */
    public clone(): Collection<T> {
        return new (this as any).constructor(this.getAll())
    }

    /**
     * Destroy Collection
     */
    public destroy(): void {
        this.trigger("destroy")
        this._offAllListener()
        this._destroyCollection()
    }

    private _destroyCollection(): void {
        delete this._models
    }

}

import assign = require("lodash/assign")
import chunk = require("lodash/chunk")
import countBy = require("lodash/countBy")
import each = require("lodash/each")
import filter = require("lodash/filter")
import find = require("lodash/find")
import groupBy = require("lodash/groupBy")
import isUndefined = require("lodash/isUndefined")
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

    protected _models: { [key: string]: T } = {}
    protected _uniqhash: string = "l_id"

    constructor(models: Array<T | object> = [], hashParam: string = "l_id") {
        super()
        this._uniqhash = hashParam
        this.merge(models, {silent: true})
    }

    private _clearCollection(): void {
        each(Object.keys(this._models), (key) => {
            delete this._models[key]
        })
    }

    /**
     * Add Model to Collection
     * @param item
     * @param options
     * @returns {boolean}
     */
    public add(item: T | object, options: IOptions = {}): boolean {
        const model: T = (item instanceof Model) ? item : new Model(item as object) as any
        const hash = model.get(this._uniqhash)
        const existModel = this.findByHash(hash)
        if (!existModel) {
            this._models[hash] = model
            if (options.silent !== true) {
                this.trigger("add", model)
            }
            return true
        }
        if (existModel && options.merge === true) {
            existModel.reset(model as any)
        }
        return false
    }

    /**
     * Remove Model from Collection
     * @param model
     * @param options
     * @returns {boolean}
     */
    public remove(model: T, options: IOptions= {}): boolean {
        if (!(model instanceof Model)) {
            throw new Error("model isn't instance of Model")
        }
        const hash = model.get(this._uniqhash)
        if (this.findByHash(hash)) {
            delete this._models[hash]
            if (options.silent !== true) {
                this.trigger("remove", model)
            }
            return true
        }
        return false
    }

    /**
     * Check existing Model in Collection
     * @param model
     * @returns {boolean}
     */
    public has(model: T): boolean {
        if (!(model instanceof Model)) {
            throw new Error("model isn't instance of Model")
        }
        const hash = model.get(this._uniqhash)
        return !!this.findByHash(hash)
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
     * find Model by hash
     * @param hash
     * @returns {T}
     */
    public findByHash(hash: string): T | null {
        return !isUndefined(this._models[hash]) ? this._models[hash] : null
    }

    /**
     * Find by predicate in Collection
     * @param predicate
     * @param startIndex
     * @returns {undefined|T}
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
     * @param items
     * @param options
     */
    public merge(items: Array<T | object>, options: IOptions = {}): void {
        options = assign(options, {merge: true})
        items.forEach((item) => {
            this.add(item, options)
        })
    }

    /**
     * Reset Collection with new Array of Model or JSON
     * @param items
     * @param options
     */
    public reset(items: Array<T | object> = [], options: IOptions = {}): void {
        this._clearCollection()
        this.merge(items, {silent: true})
        if (options.silent !== true) {
            this.trigger("reset")
        }
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
     * @returns {Collection<T>}
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

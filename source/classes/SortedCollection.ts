import assign = require("lodash/assign")
import isFunction = require("lodash/isFunction")
import isString = require("lodash/isString")
import { IModel, IOptions } from "../interfaces"
import { Collection } from "./Collection"
import { Model } from "./Model"

export class SortedCollection<T extends IModel> extends Collection<T> {
    protected modelsArray: Array<T> = []
    public comparator: (itemA: T, itemB: T) => number

    constructor(items: Array<T| object> = [], hashParam?: string) {
        super([], hashParam)
        if (isString(hashParam)) {
            this._uniqhash = hashParam
        }
        this.merge(items, {silent: true})
    }

    protected sort(options: IOptions = {}): void {
        if (isFunction(this.comparator)) {
            this.modelsArray.sort(this.comparator)
            if (options.silent !== true) {
                this.trigger("sort")
            }
        }
    }

    public add(item: T | object, options: IOptions = {}, sort: boolean = true): boolean {
        const model: T = (item instanceof Model) ? item : new Model(item as object) as any
        if (super.add(model, assign({}, options, {silent: true}))) {
            this.modelsArray.push(model)
            if (options.silent !== true) {
                this.trigger("add", model)
            }
            if (sort === true) {
                this.sort(options)
            }
            return true
        }
        return false
    }

    public remove(model: T, options: IOptions = {}): boolean {
        if (super.remove(model, {silent: true})) {
            const index = this.modelsArray.indexOf(model)
            if (index > -1) {
                this.modelsArray.splice(index, 1)
            }
            if (options.silent !== true) {
                this.trigger("remove", model)
            }
            return true
        }
        return false
    }

    public reset(items: Array<T| object> = [], options: IOptions = {}): void {
        this.modelsArray = []
        super.reset(items, {silent: true})
        this.trigger("reset")
    }

    public merge(items: Array<T | object>, options: IOptions = {}): void {
        items.forEach((item) => {
            this.add(item, options, false)
        })
        this.sort(options)
    }

    public getAll(): Array<T> {
        return this.modelsArray
    }

    public getLength(): number {
        return this.modelsArray.length
    }
}

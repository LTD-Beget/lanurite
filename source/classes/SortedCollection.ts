import assign = require("lodash/assign")
import isFunction = require("lodash/isFunction")
import isString = require("lodash/isString")
import { IModel } from "../interfaces/IModel"
import { IOptions } from "../interfaces/IOptions"
import { Collection } from "./Collection"
import { Model } from "./Model"

export class SortedCollection<T extends IModel> extends Collection<T> {
    protected modelsArray: Array<Model<T>> = []
    public comparator: (itemA: Model<T>, itemB: Model<T>) => number

    constructor(items: Array<Model<T>| object> = [], hashParam?: string) {
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

    public add(item: Model<T> | object, options: IOptions = {}, sort: boolean = true): boolean {
        const model = (item instanceof Model) ? item : new Model<T>(item as T)
        if (super.add(model), {silent: true}) {
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

    public remove(model: Model<T>, options: IOptions = {}): boolean {
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

    public reset(items: Array<Model<T>| object> = [], options: IOptions = {}): void {
        super.reset(items, {silent: true})
        this.modelsArray = super.getAll()
        this.trigger("reset")
        this.sort()
    }

    public merge(items: Array<T | object>, options: IOptions = {}): void {
        options = assign(options, {merge: true})
        items.forEach((item) => {
            this.add(item, options)
        })
    }

    public getAll(): Array<Model<T>> {
        return this.modelsArray
    }

    public getLength(): number {
        return this.modelsArray.length
    }
}

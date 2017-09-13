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

    public has(model: T | IModel) {
        return !Event._isUndefined(this._models[model.get("l_id")])
    }

    public clear() {
        this._clearCollection()
        this.trigger("clear")
    }

    public filter(predicate: IPredicate): T[] {
        return _.filter<T>(this.getAll(), predicate)
    }

    public map(predicate: IPredicate): any[] {
        return _.map(this.getAll(), predicate)
    }

    public getById(id: string): T | IModel {
        if (!Event._isUndefined(this._models[id])) {
            return this._models[id]
        }
        return null
    }

    public find(predicate: IPredicate, startIndex: number = 0): T | undefined {
        return _.find<T>(this.getAll(), predicate, startIndex)
    }

    public reduce(predicate: IPredicate, accum: any = 0): any {
        return _.reduce(this.getAll(), predicate, accum)
    }

    public getAll(): T[] {
        return _.values<T>(this._models)
    }

    public each(predicate: IPredicate) {
        return _.each(this.getAll(), predicate)
    }

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

    public reset(array: any[] = []) {
        this._clearCollection()
        this._init(array)
        this.trigger("reset")
    }

    public getLength(): number {
        return Object.keys(this._models).length
    }

    public toJSON(): any {
        return _.map(this.getAll(), (el) => {
            return el.toJSON()
        })
    }

    public sortBy(predicate: IPredicate): void {
        this.reset(this.getAll().sort(predicate))
    }

    public toArray(): T[] {
        return this.getAll()
    }

    public chunk(size: number = 1): T[][] {
        return _.chunk(this.getAll(), size)
    }

    public countBy(predicate: IPredicate): { [key: string]: number } {
        return _.countBy(this.getAll(), predicate)
    }

    public groupBy(predicate: IPredicate): { [key: string]: T[] } {
        return _.groupBy<T>(this.getAll(), predicate)
    }

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
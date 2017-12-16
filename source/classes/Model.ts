import assign = require("lodash/assign")
import clone = require("lodash/clone")
import uniqueId = require("lodash/uniqueId")
import { IModel } from "../interfaces/IModel"
import { IModels } from "../interfaces/IModels"
import { Event } from "./Event"

export class Model<T extends IModels> extends Event implements IModel {

    private _model: T = {} as T

    constructor(obj: T = {} as T) {
        super()
        this._model = assign({}, {l_id: uniqueId("lr_")}, obj)
    }

    /**
     * Return private model
     * @returns {any}
     */
    public getModel(): T {
        return this._model
    }

    /**
     * Get value by key
     * @param key
     * @returns {any}
     */
    public get(key: string): any {
        return this._model[key]
    }

    /**
     * Set value on key in Models
     * @param key
     * @param value
     */
    public set(key: string, value: any): void {
        if (this.has(key)) {
            const oldValue = this.get(key)
            this._model[key] = value
            this.trigger("change", {name: key, value, oldValue})
        } else {
            this._model[key] = value
            this.trigger("set", {name: key, value})
        }
    }

    /**
     * Checked key in Model
     * @param key
     * @returns {boolean}
     */
    public has(key: string): boolean {
        return !Event._isUndefined(this._model[key])
    }

    /**
     * Get JSON from Model
     * @returns {{[p: string]: any}}
     */
    public toJSON(): any {
        return clone(this._model)
    }

    /**
     * Drop key from Model
     * @param key
     * @returns {boolean}
     */
    public drop(key: string): boolean {
        if (this.has(key)) {
            delete this._model[key]
            return true
        }
        return false
    }

    /**
     * Reset Model by another value or Model
     * @param object
     */
    public reset(object: T): void {
        const oldValue = this.toJSON()
        if (Model.isModel(object)) {
            object = object.toJSON()
        }
        this._model = assign({}, object, {l_id: oldValue.l_id})
        this.trigger("reset", {value: this.toJSON(), oldValue})
    }

    /**
     * Destroy Model
     */
    public destroy(): void {
        this.trigger("destroy")
        this._offAllListener()
        this._destroyModel()
    }

    private _destroyModel(): void {
        delete this._model
    }

    public static isModel(object: any) {
        return object instanceof Model
    }

}

import assign = require("lodash/assign")
import clone = require("lodash/clone")
import isUndefined = require("lodash/isUndefined")
import uniqueId = require("lodash/uniqueId")
import { IModel } from "../interfaces/IModel"
import { IModels } from "../interfaces/IModels"
import { Event } from "./Event"

export class Model<T extends IModels> extends Event implements IModel {

    protected _attributes: T = {} as T

    constructor(object: T = {} as T) {
        super()
        this._attributes = assign({}, {l_id: uniqueId("lr_")}, object)
    }

    /**
     * Return private attributes
     * @returns {object}
     */
    public getAttributes(): T {
        return this._attributes
    }

    /**
     * Get value by key
     * @param key
     * @returns {any}
     */
    public get(key: string): any {
        return this._attributes[key]
    }

    /**
     * Set value on key in Models
     * @param key
     * @param value
     */
    public set(key: string, value: any): void {
        if (this.has(key)) {
            const oldValue = this.get(key)
            this._attributes[key] = value
            this.trigger("change", {name: key, value, oldValue})
        } else {
            this._attributes[key] = value
            this.trigger("set", {name: key, value})
        }
    }

    /**
     * Checked key in Model
     * @param key
     * @returns {boolean}
     */
    public has(key: string): boolean {
        return !isUndefined(this._attributes[key])
    }

    /**
     * Get JSON from Model
     * @returns {object}
     */
    public toJSON(): any {
        return clone(this._attributes)
    }

    /**
     * Drop key from Model
     * @param key
     * @returns {boolean}
     */
    public drop(key: string): boolean {
        if (this.has(key)) {
            delete this._attributes[key]
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
        this._attributes = assign({}, object, {l_id: oldValue.l_id})
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
        delete this._attributes
    }

    public static isModel(object: any) {
        return object instanceof Model
    }

}

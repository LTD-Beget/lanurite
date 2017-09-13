import * as _ from "lodash"
import {IModel} from "../interfaces/IModel"
import {Event} from "./Event"
class Model extends Event implements IModel {

    private _model: { [key: string]: any } = {}

    constructor(obj: { [key: string]: any } = {}) {
        super()
        this._model = _.assign({}, {l_id: _.uniqueId("lr_")}, obj)
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
        return _.clone(this._model)
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
    public reset(object: { [key: string]: any }): void {
        const oldValue = this.toJSON()
        if (Model.isModel(object)) {
            object = object.toJSON()
        }
        this._model = _.assign({}, object, {l_id: oldValue.l_id})
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
export {Model}
import * as _ from "lodash"
import {IModel} from "../interfaces/IModel"
import {Event} from "./Event"
class Model extends Event implements IModel {

    private _model: any

    constructor(obj: any = {}) {
        super()
        this._model = _.assign({}, {l_id: _.uniqueId("lr_")}, obj)
    }

    /**
     * Get value from key in Model
     * @param key
     * @returns {any}
     */

    public get(key: string | number) {
        return this._model[key]
    }

    /**
     * Set value by key in Model
     * @param key
     * @param value
     */
    public set(key: string | number, value: any) {
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
     * Checking existing key in model
     * @param key
     * @returns {boolean}
     */
    public has(key: string | number) {
        return !_.isUndefined(this._model[key])
    }

    /**
     * Return JSON from Model
     * @returns {T}
     */

    public toJSON(): any {
        return _.clone(this._model)
    }

    /**
     * Drop value by key in Model
     * @param key
     * @returns {boolean}
     */

    public drop(key: string | number) {
        if (this.has(key)) {
            delete this._model[key]
            return true
        }
        return false
    }

    /**
     * Reset model with new dataset
     * @param object
     */
    public reset(object: any) {
        const oldValue = this.toJSON()
        this._model = _.assign({}, object, {l_id: oldValue.l_id})
        this.trigger("reset", {value: this.toJSON(), oldValue})
    }

    /**
     * Destroy Model remove all listener and trigger destroy
     * @returns {Model}
     */
    public destroy() {
        this.trigger("destroy")
        this._offAllListener()
        this._destroyModel()
        return this
    }

    private _destroyModel() {
        delete this._model
    }

}
export {Model}
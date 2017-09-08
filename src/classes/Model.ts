import * as _ from "lodash";
import {IModel} from "../interfaces/IModel";
import {Event} from "./Event"
class Model extends Event implements IModel {

    private _model: any;

    constructor(obj: any = {}) {
        super();
        this._model = _.assign({}, {l_id: _.uniqueId("lr_")}, obj)
    }

    /**
     * Get value from key in Model
     * @param key
     * @returns {any}
     */

    get(key: string | number) {
        return this._model[key]
    }

    /**
     * Set value by key in Model
     * @param key
     * @param value
     */
    set(key: string | number, value: any) {
        if (this.has(key)) {
            let oldValue = this.get(key)
            this._model[key] = value;
            this.trigger("change", {name: key, value: value, oldValue: oldValue});
        } else {
            this._model[key] = value;
            this.trigger("set", {name: key, value: value});
        }
    }

    /**
     * Checking existing key in model
     * @param key
     * @returns {boolean}
     */
    has(key: string | number) {
        return !_.isUndefined(this._model[key])
    }

    /**
     * Return JSON from Model
     * @returns {T}
     */

    toJSON(): any {
        return _.clone(this._model);
    }

    /**
     * Drop value by key in Model
     * @param key
     * @returns {boolean}
     */
    drop(key: string | number){
        if (this.has(key)){
            delete this._model[key];
            return true
        }
        return false
    }

}
export {Model}

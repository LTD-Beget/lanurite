import {baseCollection} from "../base/collection";
import {Models} from "./Models";
import * as _ from "lodash";
import {baseModel} from "../base/model";
import {EventsLr} from "../events/Events";
class Collections extends EventsLr implements baseCollection {
    private _models: any;

    constructor(array: Array<any> = []) {
        super()
        this._models = {};
        this._init(array)

    }

    _init(array) {
        array.forEach((object) => {
            if (object instanceof Models) {
                object._setCollection(this);
                return this._models[object.get("l_id")] = object
            }
            let model = new Models(object);
            model._setCollection(this);
            this._models[model.get("l_id")] = model
        })
    }

    add(model: baseModel) {
        if (_.isUndefined(this._models[model.get("l_id")])) {
            this._models[model.get("l_id")] = model;
            model._setCollection(this);
            this.trigger("add", model);
            return true
        }
        return false
    }

    remove(model: baseModel) {
        if (!_.isUndefined(this._models[model.get("l_id")])) {
            delete this._models[model.get("l_id")];
            model._unsetCollection();
            this.trigger("remove", model);
            return true
        }
        return false
    }


    has(model: baseModel) {
        return !_.isUndefined(this._models[model.get("l_id")])
    }

    clear() {

        Object.keys(this._events).forEach((event) => {
            this.off(event)
        });

        Object.keys(this._models).forEach((key) => {
            this._models[key]._unsetCollection();
            delete this._models[key];
        })

    }
}

export {Collections}
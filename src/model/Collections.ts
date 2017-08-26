import {baseCollection} from "../base/collection";
import {Models} from "./Models";
import * as _ from "lodash";
import {baseModel} from "../base/model";
class Collections implements baseCollection {
    private _models: any;
    private _events: any;

    constructor(array: Array<any> = []) {
        this._models = {};
        this._events = {};
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

    on(eventName: string, handler: any) {
        if (_.isUndefined(this._events[eventName])) {
            return this._events[eventName] = [handler]
        }
        this._events[eventName].push(handler)
    }


    has(model: baseModel) {
        return !_.isUndefined(this._models[model.get("l_id")])
    }

    off(eventName: string) {
        delete this._events[eventName];
    }

    trigger(eventName: string, eventParams: any = {}) {
        if (!_.isUndefined(this._events[eventName])) {
            this._events[eventName].forEach((handler) => {
                handler(eventParams)
            })
        }
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
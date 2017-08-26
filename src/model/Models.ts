import {baseModel} from "../base/model";
import * as _ from "lodash";
import {baseCollection} from "../base/collection";
class Models implements baseModel {

    private _model: any;
    private _events: any;

    constructor(obj: any = {}) {
        this._events = {};
        this._model = _.assign({}, {l_id: _.uniqueId("lr_"), collection: null}, obj)
    }


    get(key: string) {
        return this._model[key]
    }

    set(key: string, value: any) {
        if (this.hasProperty(key)) {
            let oldValue = this.get(key)
            this._model[key] = value;
            this.trigger("change", {name: key, value: value, oldValue: oldValue});
        } else {
            this._model[key] = value;
            this.trigger("set", {name: key, value: value});
        }
    }

    hasProperty(key: string) {
        return !_.isUndefined(this._model[key])
    }

    on(eventName: string, handler: any) {
        if (_.isUndefined(this._events[eventName])) {
            return this._events[eventName] = [handler]
        }
        this._events[eventName].push(handler)
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

    _unsetCollection(){
        this._model["collection"] = null
    }

    _setCollection(collection: baseCollection) {
        this._model["collection"] = collection;
    }

    getCollection(){
        return this.get("collection")
    }
}
export {Models}

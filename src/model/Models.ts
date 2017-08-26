import {baseModel} from "../base/model";
import * as _ from "lodash";
import {baseCollection} from "../base/collection";
class Models implements baseModel {

    private _model: any;
    private _events: any;

    constructor(obj: any = {}) {
        this._events = {};
        this._model = _.assign({}, {l_id: _.uniqueId("lr_"), collection: {}}, obj)
    }


    get(key: string) {
        return this._model[key]
    }

    set(key: string, value: any) {
        this.trigger("set", {name: key, value: value});
        return this._model[key] = value;
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
        this._model["collection"] = {}
    }

    _setCollection(collection: baseCollection) {
        this._model["collection"] = collection;
    }
}
export {Models}

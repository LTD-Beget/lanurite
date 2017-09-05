import {baseCollection} from "../base/collection";
import {Models} from "./Models";
import * as _ from "lodash";
import {baseModel} from "../base/model";
import {EventsLr} from "../events/Events";
class Collections extends EventsLr implements baseCollection {
    private _models: any;

    constructor(array: Array<any> = []) {
        super();
        this._models = {};
        this._init(array)

    }

    _init(array: Array<any>) {
        array.forEach((object) => {
            if (this._isModel(object)) {
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
        this.trigger("clear");
        Object.keys(this._models).forEach((key) => {
            this._models[key]._unsetCollection();
            delete this._models[key];
        })

    }

    filter(predicate: any): Array<any> {
        return _.values(this._models).filter(predicate)
    }

    map(predicate: any): Array<any> {
        return _.values(this._models).map(predicate)
    }

    getById(id: string) {
        if (!_.isUndefined(this._models[id])) {
            return this._models[id]
        }
        return null;
    }

    find(predicate: any, startIndex: number = 0): any {
        return _.find(_.values(this._models), predicate, startIndex);
    }

    reduce(predicate: any, accum: any = 0): any {
        return _.values(this._models).reduce(predicate, accum)
    }

    getAll(): Array<any> {
        return _.values(this._models)
    }

    _isModel(object: any) {
        return object instanceof Models
    }

    merge(collection: Array<any> | baseCollection) {
        if (_.isArray(collection)) {
            collection.forEach((object) => {
                if (this._isModel(object)) {
                    return this.add(object);
                }
                let model = new Models(object);
                this.add(model);
            })
        } else {
            collection.getAll().forEach((model) => {
                this.add(model);
            })
        }
    }

    reset(array: Array<any> = []) {
        Object.keys(this._models).forEach((key) => {
            this._models[key]._unsetCollection();
            delete this._models[key];
        });

        this._init(array);
        this.trigger("reset");
    }
}

export {Collections}
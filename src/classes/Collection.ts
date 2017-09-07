import * as _ from "lodash";
import {ICollection} from "../interfaces/ICollection";
import {Event} from "./Event"
import {IModel} from "../interfaces/IModel";
import {Model} from "./Model";


class Collection extends Event implements ICollection {
    private _models: any = {};

    constructor(array: Array<any> = []) {
        super();
        this._init(array)
    }

    _init(array: Array<any>) {
        array.forEach((object) => {
            if (this._isModel(object)) {
                return this._models[object.get("l_id")] = object
            }
            let model = new Model(object);
            this._models[model.get("l_id")] = model
        })
    }

    add(model: IModel) {
        if (_.isUndefined(this._models[model.get("l_id")])) {
            this._models[model.get("l_id")] = model;
            this.trigger("add", model);
            return true
        }
        return false
    }

    remove(model: IModel) {
        if (!_.isUndefined(this._models[model.get("l_id")])) {
            this._models[model.get("l_id")] = undefined;
            this.trigger("remove", model);
            return true
        }
        return false
    }


    has(model: IModel) {
        return !_.isUndefined(this._models[model.get("l_id")])
    }

    clear() {
        this.trigger("clear");
        Object.keys(this._models).forEach((key) => {
            this._models[key] = undefined;
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
        return object instanceof Model
    }

    merge(collection: Array<any> | ICollection) {
        if (_.isArray(collection)) {
            return collection.forEach((object) => {
                if (this._isModel(object)) {
                    return this.add(object);
                }
                let model = new Model(object);
                this.add(model);
            })
        }
        collection.getAll().forEach((model) => {
            this.add(model);
        })

    }

    reset(array: Array<any> = []) {
        Object.keys(this._models).forEach((key) => {
            this._models[key] = undefined;
        });

        this._init(array);
        this.trigger("reset");
    }
}


export {Collection}
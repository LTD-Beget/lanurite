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
            delete this._models[model.get("l_id")]
            this.trigger("remove", model);
            return true
        }
        return false
    }


    has(model: IModel) {
        return !_.isUndefined(this._models[model.get("l_id")])
    }

    clear() {
        this._clearCollection();
        this.trigger("clear");
    }

    filter(predicate: any): Array<any> {
        return this.getAll().filter(predicate)
    }

    map(predicate: any): Array<any> {
        return this.getAll().map(predicate)
    }

    getById(id: string) {
        if (!_.isUndefined(this._models[id])) {
            return this._models[id]
        }
        return null;
    }

    find(predicate: any, startIndex: number = 0): any {
        return _.find(this.getAll(), predicate, startIndex);
    }

    reduce(predicate: any, accum: any = 0): any {
        return this.getAll().reduce(predicate, accum)
    }

    getAll(): Array<any> {
        return _.values(this._models)
    }

    _isModel(object: any) {
        return object instanceof Model
    }

    each(predicate: any){
        return this.getAll().forEach(predicate)
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
        this._clearCollection();
        this._init(array);
        this.trigger("reset");
    }

    _clearCollection() {
        Object.keys(this._models).forEach((key) => {
            delete this._models[key]
        });
    }

    getLength(): number {
        return Object.keys(this._models).length
    }

    toJSON(){
        return this.map((el) =>{
            return el.toJSON()
        })
    }

    sortBy(predicate: any){
        this.reset(this.getAll().sort(predicate))
    }

    toArray(): Array<any>{
        return this.getAll()
    }

    chunk(size: number = 1): any{
        return _.chunk(this.getAll(), size)
    }

    countBy(predicate: any){
        return _.countBy(this.getAll(), predicate);
    }
}


export {Collection}
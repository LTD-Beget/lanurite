import { baseCollection } from "../base/collection";
import { baseModel } from "../base/model";
import { EventsLr } from "../events/Events";
declare class Collections extends EventsLr implements baseCollection {
    private _models;
    constructor(array?: Array<any>);
    _init(array: Array<any>): void;
    add(model: baseModel): boolean;
    remove(model: baseModel): boolean;
    has(model: baseModel): boolean;
    clear(): void;
    filter(predicate: any): Array<any>;
    map(predicate: any): Array<any>;
    getById(id: string): any;
    find(predicate: any, startIndex?: number): any;
    reduce(predicate: any, accum?: any): any;
    getAll(): Array<any>;
    _isModel(object: any): boolean;
    merge(collection: Array<any> | baseCollection): void;
    reset(array?: Array<any>): void;
}
export { Collections };

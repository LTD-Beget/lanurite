import { baseCollection } from "../base/collection";
import { baseModel } from "../base/model";
import { EventsLr } from "../events/Events";
declare class Collections extends EventsLr implements baseCollection {
    private _models;
    constructor(array?: Array<any>);
    _init(array: any): void;
    add(model: baseModel): boolean;
    remove(model: baseModel): boolean;
    has(model: baseModel): boolean;
    clear(): void;
    filter(predicate: any): {}[];
    map(predicate: any): {}[];
    getById(id: any): any;
    find(predicate: any, startIndex?: number): {};
    reduce(predicate: any, accum?: number): {};
}
export { Collections };

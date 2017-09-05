import { baseCollection } from "../base/collection";
import { baseModel } from "../base/model";
import { EventsLr } from "../events/Events";
declare class Collections extends EventsLr implements baseCollection {
    private _models;
    constructor(array?: Array<any>);
    _init(array: Array<T>): void;
    add(model: baseModel): boolean;
    remove(model: baseModel): boolean;
    has(model: baseModel): boolean;
    clear(): void;
    filter(predicate: any): Array<T>;
    map(predicate: any): Array<T>;
    getById(id: string): any;
    find(predicate: any, startIndex?: number): baseModel | any;
    reduce(predicate: any, accum?: any): {};
    getAll(): Array<T>;
}
export { Collections };

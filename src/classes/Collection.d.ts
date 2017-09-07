import { ICollection } from "../interfaces/ICollection";
import { Event } from "./Event";
import { IModel } from "../interfaces/IModel";
declare class Collection extends Event implements ICollection {
    private _models;
    constructor(array?: Array<any>);
    _init(array: Array<any>): void;
    add(model: IModel): boolean;
    remove(model: IModel): boolean;
    has(model: IModel): boolean;
    clear(): void;
    filter(predicate: any): Array<any>;
    map(predicate: any): Array<any>;
    getById(id: string): any;
    find(predicate: any, startIndex?: number): any;
    reduce(predicate: any, accum?: any): any;
    getAll(): Array<any>;
    _isModel(object: any): boolean;
    merge(collection: Array<any> | ICollection): void;
    reset(array?: Array<any>): void;
}
export { Collection };

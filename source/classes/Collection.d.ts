import { ICollection } from "../interfaces/ICollection";
import { IModel } from "../interfaces/IModel";
import { IPredicate } from "../interfaces/IPredicate";
import { Event } from "./Event";
declare class Collection<T extends IModel> extends Event implements ICollection<T> {
    private Type;
    private _models;
    constructor(array?: any[] | T[]);
    private _init(array);
    private _clearCollection();
    add(model: T | IModel): boolean;
    remove(model: T | IModel): boolean;
    has(model: T | IModel): boolean;
    clear(): void;
    filter(predicate: IPredicate): T[];
    map(predicate: IPredicate): any[];
    getById(id: string): T | IModel;
    find(predicate: IPredicate, startIndex?: number): T | undefined;
    reduce(predicate: IPredicate, accum?: any): any;
    getAll(): T[];
    each(predicate: IPredicate): T[];
    merge(collection: T[] | ICollection<T> | any[]): any[] | T[];
    reset(array?: any[]): void;
    getLength(): number;
    toJSON(): any;
    sortBy(predicate: IPredicate): void;
    toArray(): T[];
    chunk(size?: number): T[][];
    countBy(predicate: IPredicate): {
        [key: string]: number;
    };
    groupBy(predicate: IPredicate): {
        [key: string]: T[];
    };
    destroy(): void;
    private _destroyCollection();
}
export { Collection };

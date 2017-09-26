import { ICollection } from "../interfaces/ICollection";
import { IModel } from "../interfaces/IModel";
import { IPredicate } from "../interfaces/IPredicate";
import { Event } from "./Event";
declare class Collection<T extends IModel> extends Event implements ICollection<T> {
    private _models;
    private _uniqhash;
    constructor(array?: any[] | T[], hashParam?: string);
    private _init(array);
    private _clearCollection();
    /**
     * Add Model to Collection
     * @param model
     * @returns {boolean}
     */
    add(model: T | IModel, needReset?: boolean): boolean;
    /**
     * Remove Model from Collection
     * @param model
     * @returns {boolean}
     */
    remove(model: T | IModel): boolean;
    /**
     * Check existing Model in Collection
     * @param model
     * @returns {boolean}
     */
    has(model: T | IModel): boolean;
    /**
     * Clear Collection, events will be saving
     */
    clear(): void;
    /**
     * Filtering collection by predicate
     * @param predicate
     * @returns {S[]}
     */
    filter(predicate: IPredicate): T[];
    /**
     * Create new Array from Collection
     * @param predicate
     * @returns {TResult[]}
     */
    map(predicate: IPredicate): any[];
    /**
     * Get Model by Id
     * @param id
     * @returns {any}
     */
    getById(id: string): T | IModel;
    /**
     * Find by predicate in Collection
     * @param predicate
     * @param startIndex
     * @returns {undefined|S}
     */
    find(predicate: IPredicate, startIndex?: number): T | undefined;
    /**
     * Reduce new Collection
     * @param predicate
     * @param accum
     * @returns {{}|undefined|null}
     */
    reduce(predicate: IPredicate, accum?: any): any;
    /**
     * Get Array from Collection
     * @returns {T[]}
     */
    getAll(): T[];
    /**
     * Iterate collection by predicate
     * @param predicate
     * @returns {any}
     */
    each(predicate: IPredicate): T[];
    /**
     * Merge collection with array or another collection
     * @param collection
     * @returns {any}
     */
    merge(collection: T[] | ICollection<T> | any[]): any[] | T[];
    /**
     * Reset Collection with new Array of Model or JSON
     * @param array
     */
    reset(array?: any[] | T[]): void;
    /**
     * Get Collection length
     * @returns {number}
     */
    getLength(): number;
    /**
     * Return JSOn from Collection
     * @returns {any[]}
     */
    toJSON(): any;
    /**
     * Sort element with predicate
     * @param predicate
     */
    sortBy(predicate: IPredicate): void;
    /**
     * Get Array from Collection
     * @returns {T[]}
     */
    toArray(): T[];
    /**
     * Chunk Array on size
     * @param size
     * @returns {T[][]}
     */
    chunk(size?: number): T[][];
    /**
     * Count element by predicate
     * @param predicate
     * @returns {Dictionary<number>}
     */
    countBy(predicate: IPredicate): {
        [key: string]: number;
    };
    /**
     * Group Collection ny predicate
     * @param predicate
     * @returns {Dictionary<({}|undefined|null)[]>}
     */
    groupBy(predicate: IPredicate): {
        [key: string]: T[];
    };
    /**
     * Destroy Collection
     */
    destroy(): void;
    private _destroyCollection();
}
export { Collection };

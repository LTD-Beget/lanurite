import { ICollection } from "../interfaces/ICollection";
import { IModel } from "../interfaces/IModel";
import { IPredicate } from "../interfaces/IPredicate";
import { Event } from "./Event";
export declare class Collection<T extends IModel> extends Event implements ICollection<T> {
    private _models;
    private _uniqhash;
    constructor(array?: Array<T | any>, hashParam?: string);
    private _init(array);
    private _clearCollection();
    /**
     * Add Model to Collection
     * @param model
     * @param needReset
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
     * @returns {Array}
     */
    filter(predicate: IPredicate): Array<T>;
    /**
     * Create new Array from Collection
     * @param predicate
     * @returns {Array}
     */
    map(predicate: IPredicate): Array<any>;
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
    reduce(predicate: IPredicate, accum?: any): {} | undefined | null;
    /**
     * Get Array from Collection
     * @returns {Array}
     */
    getAll(): Array<T>;
    /**
     * Iterate collection by predicate
     * @param predicate
     */
    each(predicate: IPredicate): void;
    /**
     * Merge collection with array or another collection
     * @param collection
     */
    merge(collection: Array<T | any> | ICollection<T>): void;
    /**
     * Reset Collection with new Array of Model or JSON
     * @param array
     */
    reset(array?: Array<T | any>): void;
    /**
     * Get Collection length
     * @returns {number}
     */
    getLength(): number;
    /**
     * Return JSOn from Collection
     * @returns {Array}
     */
    toJSON(): Array<any>;
    /**
     * Sort element with predicate
     * @param predicate
     */
    sortBy(predicate: IPredicate): void;
    /**
     * Get Array from Collection
     * @returns {Array}
     */
    toArray(): Array<T>;
    /**
     * Chunk Array on size
     * @param size
     * @returns {Array<Array>}
     */
    chunk(size?: number): Array<Array<T>>;
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
        [key: string]: Array<T>;
    };
    /**
     * Create clone of original collection
     * @returns {Collection<T extends IModel>}
     */
    clone(): Collection<T>;
    /**
     * Destroy Collection
     */
    destroy(): void;
    private _destroyCollection();
}

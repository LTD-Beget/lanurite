import { ICollection } from "../interfaces/ICollection";
import { IModel } from "../interfaces/IModel";
import { IOptions } from "../interfaces/IOptions";
import { IPredicate } from "../interfaces/IPredicate";
import { Event } from "./Event";
import { Model } from "./Model";
export declare class Collection<T extends IModel> extends Event implements ICollection<T> {
    protected _models: {
        [key: string]: Model<T>;
    };
    protected _uniqhash: string;
    constructor(models?: Array<Model<T> | object>, hashParam?: string);
    private _clearCollection();
    /**
     * Add Model to Collection
     * @param item
     * @param options
     * @returns {boolean}
     */
    add(item: Model<T> | object, options?: IOptions): boolean;
    /**
     * Remove Model from Collection
     * @param model
     * @param options
     * @returns {boolean}
     */
    remove(model: Model<T>, options?: IOptions): boolean;
    /**
     * Check existing Model in Collection
     * @param model
     * @returns {boolean}
     */
    has(model: Model<T>): boolean;
    /**
     * Clear Collection, events will be saving
     */
    clear(): void;
    /**
     * Filtering collection by predicate
     * @param predicate
     * @returns {Array}
     */
    filter(predicate: IPredicate): Array<Model<T>>;
    /**
     * Create new Array from Collection
     * @param predicate
     * @returns {Array}
     */
    map(predicate: IPredicate): Array<any>;
    /**
     * find Model by hash
     * @param hash
     * @returns {Model<T>}
     */
    findByHash(hash: string): Model<T> | null;
    /**
     * Find by predicate in Collection
     * @param predicate
     * @param startIndex
     * @returns {undefined|Model<T>}
     */
    find(predicate: IPredicate, startIndex?: number): Model<T> | undefined;
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
    getAll(): Array<Model<T>>;
    /**
     * Iterate collection by predicate
     * @param predicate
     */
    each(predicate: IPredicate): void;
    /**
     * Merge collection with array or another collection
     * @param items
     * @param options
     */
    merge(items: Array<T | object>, options?: IOptions): void;
    /**
     * Reset Collection with new Array of Model or JSON
     * @param items
     * @param options
     */
    reset(items?: Array<Model<T> | object>, options?: IOptions): void;
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
     * Get Array from Collection
     * @returns {Array}
     */
    toArray(): Array<Model<T>>;
    /**
     * Chunk Array on size
     * @param size
     * @returns {Array<Array>}
     */
    chunk(size?: number): Array<Array<Model<T>>>;
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
        [key: string]: Array<Model<T>>;
    };
    /**
     * Create clone of original collection
     * @returns {Collection<Model<T>>}
     */
    clone(): Collection<Model<T>>;
    /**
     * Destroy Collection
     */
    destroy(): void;
    private _destroyCollection();
}

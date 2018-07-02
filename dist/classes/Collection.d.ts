import { ICollection, IModel, IOptions, IPredicate } from "../interfaces";
import { Event } from "./Event";
export declare class Collection<T extends IModel> extends Event implements ICollection<T> {
    protected _models: {
        [key: string]: T;
    };
    protected _uniqhash: string;
    constructor(models?: Array<T | object>, hashParam?: string);
    private _clearCollection;
    /**
     * Add Model to Collection
     * @param item
     * @param options
     * @returns {boolean}
     */
    add(item: T | object, options?: IOptions): boolean;
    /**
     * Remove Model from Collection
     * @param model
     * @param options
     * @returns {boolean}
     */
    remove(model: T, options?: IOptions): boolean;
    /**
     * Check existing Model in Collection
     * @param model
     * @returns {boolean}
     */
    has(model: T): boolean;
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
     * find Model by hash
     * @param hash
     * @returns {T}
     */
    findByHash(hash: string): T | null;
    /**
     * Find by predicate in Collection
     * @param predicate
     * @param startIndex
     * @returns {undefined|T}
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
     * @param items
     * @param options
     */
    merge(items: Array<T | object>, options?: IOptions): void;
    /**
     * Reset Collection with new Array of Model or JSON
     * @param items
     * @param options
     */
    reset(items?: Array<T | object>, options?: IOptions): void;
    getHashName(): string;
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
     * @returns {Collection<T>}
     */
    clone(): Collection<T>;
    /**
     * Destroy Collection
     */
    destroy(): void;
    private _destroyCollection;
}

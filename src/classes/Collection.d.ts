/// <reference types="lodash" />
import { Dictionary } from "lodash";
import { ICollection } from "../interfaces/ICollection";
import { IModel } from "../interfaces/IModel";
import { Event } from "./Event";
declare class Collection<T extends IModel> extends Event implements ICollection<T> {
    private _models;
    constructor(array?: any[]);
    private _init(array);
    private _isModel(object);
    private _clearCollection();
    /**
     * Add model in collection, return True if model added or False if model already in collection
     * @param model
     * @returns {boolean}
     */
    add(model: T | IModel): boolean;
    /**
     * Remove model from collection, return true if model removed or False if model not in collection
     * @param model
     * @returns {boolean}
     */
    remove(model: T): boolean;
    /**
     * Return existing model in collection
     * @param model
     * @returns {boolean}
     */
    has(model: T): boolean;
    /**
     * Clear collection, remove all models, event will be save
     */
    clear(): void;
    /**
     * Filtering collection with predicate
     * @param predicate - function
     * @returns {T[]}
     */
    filter(predicate: any): T[];
    /**
     * Create new array with predicate
     * @param predicate - function
     * @returns {T[]}
     */
    map(predicate: any): T[];
    /**
     * Get Model by id
     * @param id
     * @returns Model | null
     */
    getById(id: string): any;
    /**
     * Find first model filtering by predicate
     * @param predicate - function
     * @param startIndex - number start index
     * @returns {Model|undefined}
     */
    find(predicate: any, startIndex?: number): T | undefined;
    /**
     * Accumulation collection with predicate
     * @param predicate - function
     * @param accum
     * @returns {any}
     */
    reduce(predicate: any, accum?: any): any;
    /**
     * Return Array of Model
     * @returns {Array[Model]}
     */
    getAll(): T[];
    /**
     * Iterate collection with predicate
     * @param predicate - function
     */
    each(predicate: any): void;
    /**
     * Merge collection with T[] or Array<Model>
     * @param collection
     */
    merge(collection: any[] | ICollection<T>): void;
    /**
     * Reset collection with new data array, events will be save
     * @param array
     */
    reset(array?: any[]): void;
    /**
     * Get collection length
     * @returns {number}
     */
    getLength(): number;
    /**
     * Get JSON from collection
     * @returns {T[]}
     */
    toJSON(): any;
    /**
     * Sorting collection with predicate, changing collection order.
     * @param predicate - function
     */
    sortBy(predicate: any): void;
    /**
     * Return Array of Model
     * @returns {T[]}
     */
    toArray(): T[];
    /**
     * Creates an collection of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
     * @param size
     * @returns {T[]}
     */
    chunk(size?: number): T[][];
    /**
     * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number
     * of times the key was returned by iteratee.
     * @param predicate - function
     * @returns {Dictionary<number>}
     */
    countBy(predicate: any): Dictionary<number>;
    /**
     * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the
     * order they occur in collection. The corresponding value of each key is an array of elements responsible for generating the key.
     * @param predicate - function
     * @returns {Dictionary<T[]>}
     */
    groupBy(predicate: any): Dictionary<T[]>;
    /**
     * Destoy Collection remove all event and trigger destroy
     * @returns {Collection}
     */
    destroy(): this;
    private _destroyCollection();
}
export { Collection };

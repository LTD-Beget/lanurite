/// <reference types="lodash" />
import * as _ from "lodash";
import { ICollection } from "../interfaces/ICollection";
import { IModel } from "../interfaces/IModel";
import { Event } from "./Event";
declare class Collection extends Event implements ICollection {
    private _models;
    constructor(array?: Array<any>);
    private _init(array);
    private _isModel(object);
    private _clearCollection();
    /**
     * Add model in collection, return True if model added or False if model already in collection
     * @param model
     * @returns {boolean}
     */
    add(model: IModel): boolean;
    /**
     * Remove model from collection, return true if model removed or False if model not in collection
     * @param model
     * @returns {boolean}
     */
    remove(model: IModel): boolean;
    /**
     * Return existing model in collection
     * @param model
     * @returns {boolean}
     */
    has(model: IModel): boolean;
    /**
     * Clear collection, remove all models, event will be save
     */
    clear(): void;
    /**
     * Filtering collection with predicate
     * @param predicate - function
     * @returns {Array<any>}
     */
    filter(predicate: any): Array<any>;
    /**
     * Create new array with predicate
     * @param predicate - function
     * @returns {Array<any>}
     */
    map(predicate: any): Array<any>;
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
    find(predicate: any, startIndex?: number): any;
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
    getAll(): Array<any>;
    /**
     * Iterate collection with predicate
     * @param predicate - function
     */
    each(predicate: any): void;
    /**
     * Merge collection with Array<any> or Array<Model>
     * @param collection
     */
    merge(collection: Array<any> | ICollection): void;
    /**
     * Reset collection with new data array, events will be save
     * @param array
     */
    reset(array?: Array<any>): void;
    /**
     * Get collection length
     * @returns {number}
     */
    getLength(): number;
    /**
     * Get JSON from collection
     * @returns {Array<any>}
     */
    toJSON(): any[];
    /**
     * Sorting collection with predicate, changing collection order.
     * @param predicate - function
     */
    sortBy(predicate: any): void;
    /**
     * Return Array of Model
     * @returns {Array<any>}
     */
    toArray(): Array<any>;
    /**
     * Creates an collection of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
     * @param size
     * @returns {Array<any>}
     */
    chunk(size?: number): Array<any>;
    /**
     * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number
     * of times the key was returned by iteratee.
     * @param predicate - function
     * @returns {Dictionary<number>}
     */
    countBy(predicate: any): _.Dictionary<number>;
    /**
     * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the
     * order they occur in collection. The corresponding value of each key is an array of elements responsible for generating the key.
     * @param predicate - function
     * @returns {Dictionary<Array<any>>}
     */
    groupBy(predicate: any): _.Dictionary<any[]>;
}
export { Collection };

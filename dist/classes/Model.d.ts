import { IModel, IModels, IOptions } from "../interfaces";
import { Event } from "./Event";
export declare class Model<T extends IModels> extends Event implements IModel {
    protected _attributes: T;
    constructor(object?: T);
    /**
     * Return private attributes
     * @returns {object}
     */
    getAttributes(): T;
    /**
     * Get value by key
     * @param key
     * @returns {any}
     */
    get(key: string): any;
    /**
     * Set value on key in Models
     * @param key
     * @param value
     */
    set(key: string, value: any): void;
    /**
     * Checked key in Model
     * @param key
     * @returns {boolean}
     */
    has(key: string): boolean;
    /**
     * Get JSON from Model
     * @returns {object}
     */
    toJSON(): any;
    /**
     * Drop key from Model
     * @param key
     * @returns {boolean}
     */
    drop(key: string): boolean;
    /**
     * Reset Model by another value or Model
     * @param object
     * @param options
     */
    reset(object: T, options?: IOptions): void;
    /**
     * Destroy Model
     */
    destroy(): void;
    private _destroyModel;
    static isModel(object: any): boolean;
}

import { IModel } from "../interfaces/IModel";
import { IModels } from "../interfaces/IModels";
import { Event } from "./Event";
declare class Model<T extends IModels> extends Event implements IModel {
    private _model;
    constructor(obj?: T);
    /**
     * Return private models
     * @returns {{[p: string]: any}}
     */
    getModels(): T;
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
     * @returns {{[p: string]: any}}
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
     */
    reset(object: T): void;
    /**
     * Destroy Model
     */
    destroy(): void;
    private _destroyModel();
    static isModel(object: any): boolean;
}
export { Model };

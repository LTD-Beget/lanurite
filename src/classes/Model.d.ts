import { IModel } from "../interfaces/IModel";
import { Event } from "./Event";
declare class Model extends Event implements IModel {
    private _model;
    constructor(obj?: any);
    /**
     * Get value from key in Model
     * @param key
     * @returns {any}
     */
    get(key: string | number): any;
    /**
     * Set value by key in Model
     * @param key
     * @param value
     */
    set(key: string | number, value: any): void;
    /**
     * Checking existing key in model
     * @param key
     * @returns {boolean}
     */
    has(key: string | number): boolean;
    /**
     * Return JSON from Model
     * @returns {T}
     */
    toJSON(): any;
    /**
     * Drop value by key in Model
     * @param key
     * @returns {boolean}
     */
    drop(key: string | number): boolean;
}
export { Model };

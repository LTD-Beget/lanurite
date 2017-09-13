import { IModel } from "../interfaces/IModel";
import { Event } from "./Event";
declare class Model extends Event implements IModel {
    private _model;
    constructor(obj?: {
        [key: string]: any;
    });
    get(key: string): any;
    set(key: string, value: any): void;
    has(key: string): boolean;
    toJSON(): any;
    drop(key: string): boolean;
    reset(object: {
        [key: string]: any;
    }): void;
    destroy(): void;
    private _destroyModel();
    static isModel(object: any): boolean;
}
export { Model };

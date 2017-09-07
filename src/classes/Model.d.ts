import { IModel } from "../interfaces/IModel";
import { Event } from "./Event";
declare class Model extends Event implements IModel {
    private _model;
    constructor(obj?: any);
    get(key: string): any;
    set(key: string, value: any): void;
    hasProperty(key: string): boolean;
}
export { Model };

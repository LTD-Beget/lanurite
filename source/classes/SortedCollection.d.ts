import { IModel } from "../interfaces/IModel";
import { IOptions } from "../interfaces/IOptions";
import { Collection } from "./Collection";
export declare class SortedCollection<T extends IModel> extends Collection<T> {
    protected modelsArray: Array<T>;
    comparator: (itemA: T, itemB: T) => number;
    constructor(items?: Array<T | object>, hashParam?: string);
    protected sort(options?: IOptions): void;
    add(item: T | object, options?: IOptions, sort?: boolean): boolean;
    remove(model: T, options?: IOptions): boolean;
    reset(items?: Array<T | object>, options?: IOptions): void;
    merge(items: Array<T | object>, options?: IOptions): void;
    getAll(): Array<T>;
    getLength(): number;
}

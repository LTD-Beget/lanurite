import { IModel } from "../interfaces/IModel";
import { IOptions } from "../interfaces/IOptions";
import { Collection } from "./Collection";
import { Model } from "./Model";
export declare class SortedCollection<T extends IModel> extends Collection<T> {
    protected modelsArray: Array<Model<T>>;
    comparator: (itemA: Model<T>, itemB: Model<T>) => number;
    constructor(items?: Array<Model<T> | object>, hashParam?: string);
    protected sort(options?: IOptions): void;
    add(item: Model<T> | object, options?: IOptions, sort?: boolean): boolean;
    remove(model: Model<T>, options?: IOptions): boolean;
    reset(items?: Array<Model<T> | object>, options?: IOptions): void;
    merge(items: Array<T | object>, options?: IOptions): void;
    getAll(): Array<Model<T>>;
    getLength(): number;
}

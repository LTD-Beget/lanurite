import {IModel} from "./IModel";
import {IEvent} from "./IEvent";
export interface ICollection {
    add(model: IModel): boolean
    remove(model: IModel): boolean
    clear(): void
    has(model: IModel): boolean
    getAll(): Array<any>
    merge(collection: Array<any> | ICollection): void
    filter(predicate: any): Array<any>
    map(predicate: any): Array<any>
    reduce(predicate: any, accum: any): any
    getById(id: string): IModel | null
    find(predicate: any, start: Number): any
    reset(array: Array<any>): void
    getLength(): number
    each(predicate: any): void
    toJSON(): any;
    sortBy(predicate: any): any
    toArray(): Array<any>
    chunk(size: number): Array<any>
    countBy(predicate: any): any
    groupBy(predicate: any): any
}
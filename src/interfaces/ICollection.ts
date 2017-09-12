import {IEvent} from "./IEvent"
import {IModel} from "./IModel"
export interface ICollection<T extends IModel> {
    add(model: IModel): boolean
    remove(model: IModel): boolean
    clear(): void
    has(model: IModel): boolean
    getAll(): Array<T>
    merge(collection: Array<T> | ICollection<T>): void
    filter(predicate: any): Array<T>
    map(predicate: any): Array<T>
    reduce(predicate: any, accum: any): any
    getById(id: string): IModel | null
    find(predicate: any, start: number): T | undefined
    reset(array: Array<T>): void
    getLength(): number
    each(predicate: any): void
    toJSON(): any
    sortBy(predicate: any): any
    toArray(): Array<T>
    chunk(size: number): Array<Array<T>>
    countBy(predicate: any): any
    groupBy(predicate: any): any
    destroy(): void
}
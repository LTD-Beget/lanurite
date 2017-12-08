import { IModel } from "./IModel"
import { IPredicate } from "./IPredicate"

export interface ICollection<T extends IModel> {
    add(model: T | IModel): boolean
    remove(model: T | IModel): boolean
    clear(): void
    has(model: T | IModel): boolean
    getAll(): Array<T>
    merge(collection: Array<T> | ICollection<T> | Array<any>): void
    filter(predicate: IPredicate): Array<T>
    map(predicate: IPredicate): Array<any>
    reduce(predicate: IPredicate, accum: any): any
    getById(id: string): T | IModel | null
    find(predicate: IPredicate, start: number): T | undefined
    reset(array: Array<any> | Array<T>): void
    getLength(): number
    each(predicate: IPredicate): void
    toJSON(): any
    sortBy(predicate: IPredicate): void
    toArray(): Array<T>
    chunk(size: number): Array<Array<T>>
    countBy(predicate: IPredicate): { [key: string]: number }
    groupBy(predicate: IPredicate): { [key: string]: Array<T> }
    destroy(): void
}
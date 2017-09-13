import {IModel} from "./IModel"
import {IPredicate} from "./IPredicate"

export interface ICollection<T extends IModel> {
    add(model: T | IModel): boolean
    remove(model: T | IModel): boolean
    clear(): void
    has(model: T | IModel): boolean
    getAll(): T[]
    merge(collection: T[] | ICollection<T> | any[]): void
    filter(predicate: IPredicate): T[]
    map(predicate: IPredicate): any[]
    reduce(predicate: IPredicate, accum: any): any
    getById(id: string): T | IModel | null
    find(predicate: IPredicate, start: number): T | undefined
    reset(array: any[] | T[]): void
    getLength(): number
    each(predicate: IPredicate): void
    toJSON(): any
    sortBy(predicate: IPredicate): void
    toArray(): T[]
    chunk(size: number): T[][]
    countBy(predicate: IPredicate): { [key: string]: number }
    groupBy(predicate: IPredicate): { [key: string]: T[] }
    destroy(): void
}
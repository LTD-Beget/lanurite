import { IModel } from "./IModel"
import { IOptions } from "./IOptions"
import { IPredicate } from "./IPredicate"

export interface ICollection<T extends IModel> {
    add(model: T, options?: IOptions): boolean
    remove(model: T, options?: IOptions): boolean
    clear(): void
    has(model: T): boolean
    getAll(): Array<T>
    merge(collection: Array<T>, options?: IOptions): void
    filter(predicate: IPredicate): Array<T>
    map(predicate: IPredicate): Array<any>
    reduce(predicate: IPredicate, accum: any): any
    findByHash(hash: string): T | null
    find(predicate: IPredicate, start: number): T | undefined
    reset(array: Array<T | object>, options?: IOptions): void
    getHashName(): string
    getLength(): number
    each(predicate: IPredicate): void
    toJSON(): any
    toArray(): Array<T>
    chunk(size: number): Array<Array<T>>
    countBy(predicate: IPredicate): { [key: string]: number }
    clone(): ICollection<T>
    groupBy(predicate: IPredicate): { [key: string]: Array<T> }
    destroy(): void
}

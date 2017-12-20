import { Model } from "../classes/Model"
import { IModel } from "./IModel"
import { IOptions } from "./IOptions"
import { IPredicate } from "./IPredicate"

export interface ICollection<T extends IModel> {
    add(model: T, options?: IOptions): boolean
    remove(model: Model<T>, options?: IOptions): boolean
    clear(): void
    has(model: Model<T>): boolean
    getAll(): Array<Model<T>>
    merge(collection: Array<T>, options?: IOptions): void
    filter(predicate: IPredicate): Array<Model<T>>
    map(predicate: IPredicate): Array<any>
    reduce(predicate: IPredicate, accum: any): any
    findByHash(hash: string): Model<T> | null
    find(predicate: IPredicate, start: number): Model<T> | undefined
    reset(array: Array<Model<T> | object>, options?: IOptions): void
    getLength(): number
    each(predicate: IPredicate): void
    toJSON(): any
    toArray(): Array<Model<T>>
    chunk(size: number): Array<Array<Model<T>>>
    countBy(predicate: IPredicate): { [key: string]: number }
    clone(): ICollection<Model<T>>
    groupBy(predicate: IPredicate): { [key: string]: Array<Model<T>> }
    destroy(): void
}

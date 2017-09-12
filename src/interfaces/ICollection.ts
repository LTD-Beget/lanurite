import {Dictionary} from "lodash"
import {IEvent} from "./IEvent"
import {IModel} from "./IModel"

export interface ICollection<T extends IModel> {
    add(model: T | IModel): boolean
    remove(model: T): boolean
    clear(): void
    has(model: T): boolean
    getAll(): Array<T>
    merge(collection: Array<T> | ICollection<T>): void
    filter(predicate: any): Array<T>
    map(predicate: any): Array<T>
    reduce(predicate: any, accum: any): any
    getById(id: string): T | null
    find(predicate: any, start: number): T | undefined
    reset(array: Array<T>): void
    getLength(): number
    each(predicate: any): void
    toJSON(): any
    sortBy(predicate: any): void
    toArray(): Array<T>
    chunk(size: number): Array<Array<T>>
    countBy(predicate: any): Dictionary<number>
    groupBy(predicate: any): Dictionary<Array<T>>
    destroy(): void
}
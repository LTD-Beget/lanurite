import {Dictionary} from "lodash"
import {IEvent} from "./IEvent"
import {IModel} from "./IModel"

export interface ICollection<T extends IModel> {
    add(model: T | IModel): boolean
    remove(model: T): boolean
    clear(): void
    has(model: T): boolean
    getAll(): T[]
    merge(collection: any[] | ICollection<T>): void
    filter(predicate: any): T[]
    map(predicate: any): T[]
    reduce(predicate: any, accum: any): any
    getById(id: string): T | null
    find(predicate: any, start: number): T | undefined
    reset(array: any[]): void
    getLength(): number
    each(predicate: any): void
    toJSON(): any
    sortBy(predicate: any): void
    toArray(): T[]
    chunk(size: number): T[][]
    countBy(predicate: any): Dictionary<number>
    groupBy(predicate: any): Dictionary<T[]>
    destroy(): void
}
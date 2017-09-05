import {baseModel} from "./model";
import {baseEvents} from "./events";
import {Dictionary} from "lodash";
export interface baseCollection extends baseEvents {
    add(model: baseModel): boolean
    remove(model: baseModel): boolean
    clear(): void
    has(model: baseModel): boolean
    getAll(): Array<T>
    merge(collection: Array<T> | baseCollection): void
    filter(predicate: any): Array<T>
    map(predicate: any): Array<T>
    reduce(predicate: any, accum: any): any
    getById(id: string): baseModel | null
    find(predicate: any, start: Number): baseModel | undefined
    reset(array: Array<T>): void
}
import {baseModel} from "./model";
import {baseEvents} from "./events";
import {Dictionary} from "lodash";
export interface baseCollection extends baseEvents{
    add(model: baseModel): boolean
    remove(model: baseModel): boolean
    clear(): void
    has(model: baseModel): boolean
    filter(predicate: any): Array<any>
    map(predicate:any): Array<any>
    reduce(predicate:any, accum: any): any
    getById(id: string): baseModel|null
    find(predicate, start: Number): any|undefined
}
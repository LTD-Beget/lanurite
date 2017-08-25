import {baseModel} from "./model";
export interface baseCollection{
    add(model: baseModel): boolean
    remove(model: baseModel): boolean
    clear(): void
    has(model: baseModel): boolean
    on(eventName: string, handled: void): void
    trigger(eventName: string, eventParams: any): void
    off(eventName: string): void
}
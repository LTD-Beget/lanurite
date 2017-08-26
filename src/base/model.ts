import {baseCollection} from "./collection";
export interface baseModel {
    get(property: string | number): any;
    set(property: string | number, value: any): void
    hasProperty(property: string | number): boolean
    on(eventName: string, handled: void): void
    trigger(eventName: string, eventParams: any): void
    off(eventName: string): void
    _unsetCollection(): void
    _setCollection(collection: baseCollection)
}
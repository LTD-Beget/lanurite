import {baseCollection} from "./collection";
import {baseEvents} from "./events";
export interface baseModel extends baseEvents{
    get(property: string | number): any;
    set(property: string | number, value: any): void
    hasProperty(property: string | number): boolean
    _unsetCollection(): void
    _setCollection(collection: baseCollection)
}
import { baseModel } from "../base/model";
import { baseCollection } from "../base/collection";
import { EventsLr } from "../events/Events";
declare class Models extends EventsLr implements baseModel {
    private _model;
    constructor(obj?: any);
    get(key: string): any;
    set(key: string, value: any): void;
    hasProperty(key: string): boolean;
    _unsetCollection(): void;
    _setCollection(collection: baseCollection): void;
    getCollection(): any;
}
export { Models };

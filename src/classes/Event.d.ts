import { IEvent } from "../interfaces/IEvent";
declare class Event implements IEvent {
    protected _events: any;
    on(eventName: string, handler: any): any[];
    off(eventName: string, handler?: any): boolean;
    trigger(eventName: string, eventParams?: any): void;
}
export { Event };

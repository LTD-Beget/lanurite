import { IEvent } from "../interfaces/IEvent";
declare class Event implements IEvent {
    _events: any;
    on(eventName: string, handler: any): any[];
    off(eventName: string): void;
    trigger(eventName: string, eventParams?: any): void;
}
export { Event };

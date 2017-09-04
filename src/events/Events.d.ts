import { baseEvents } from "../base/events";
declare class EventsLr implements baseEvents {
    _events: any;
    constructor();
    on(eventName: string, handler: any): any[];
    off(eventName: string): void;
    trigger(eventName: string, eventParams?: any): void;
}
export { EventsLr };

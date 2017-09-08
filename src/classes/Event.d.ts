import { IEvent } from "../interfaces/IEvent";
declare class Event implements IEvent {
    protected _events: any;
    /**
     * Add handler for eventName
     * @param eventName
     * @param handler
     */
    on(eventName: string, handler: any): any[];
    /**
     * Remove all handler from eventName, or remove same handler from event
     * @param eventName
     * @param handler
     */
    off(eventName: string, handler?: any): boolean;
    /**
     * Triggered event
     * @param eventName
     * @param eventParams
     */
    trigger(eventName: string, eventParams?: any): void;
}
export { Event };

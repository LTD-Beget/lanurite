import { IEvent } from "../interfaces/IEvent";
declare class Event implements IEvent {
    protected _events: any;
    /**
     * Add handler for events array or string
     * @param eventsName
     * @param handler
     */
    on(eventsName: string | string[], handler: any): void | any[];
    private _createEvent(event, handler);
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
    protected _offAllListener(): void;
}
export { Event };

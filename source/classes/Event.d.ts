import { IEvent } from "../interfaces/IEvent";
import { IHandler } from "../interfaces/IHandler";
declare class Event implements IEvent {
    protected _events: {
        [event: string]: IHandler[];
    };
    /**
     * Add handler on Event
     * @param eventsName
     * @param handler
     */
    on(eventsName: string | string[], handler: IHandler): void;
    private _createEvent(event, handler);
    /**
     * Remove handler from Event
     * @param eventName
     * @param handler
     */
    off(eventName: string, handler?: IHandler): void;
    /**
     * Trigger Event with Param
     * @param eventName
     * @param eventParams
     */
    trigger(eventName: string, eventParams?: {} | undefined | null): void;
    protected _offAllListener(): void;
    protected static _isUndefined(obj: any): boolean;
}
export { Event };

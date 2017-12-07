import { IEvent } from "../interfaces/IEvent";
import { IHandler } from "../interfaces/IHandler";
export declare class Event implements IEvent {
    protected _events: {
        [event: string]: Array<IHandler>;
    };
    /**
     * Add handler on Event
     * @param eventsName
     * @param handler
     */
    on(eventsName: string | Array<string>, handler: IHandler): void;
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

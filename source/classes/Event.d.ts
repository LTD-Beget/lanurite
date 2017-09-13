import { IEvent } from "../interfaces/IEvent";
import { IHandler } from "../interfaces/IHandler";
declare class Event implements IEvent {
    protected _events: {
        [event: string]: IHandler[];
    };
    on(eventsName: string | string[], handler: IHandler): void;
    private _createEvent(event, handler);
    off(eventName: string, handler?: IHandler): void;
    trigger(eventName: string, eventParams?: {} | undefined | null): void;
    protected _offAllListener(): void;
    protected static _isUndefined(obj: any): boolean;
}
export { Event };

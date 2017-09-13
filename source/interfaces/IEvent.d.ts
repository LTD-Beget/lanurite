import { IHandler } from "./IHandler";
export interface IEvent {
    on(event: string | string[], handler: IHandler): void;
    trigger(eventName: string, eventParam: {} | undefined | null): void;
    off(event: string): void;
}

export interface IEvent {
    on(event: string | string[], handler: any): void;
    trigger(eventName: string, event: any): void;
    off(event: string): void;
}

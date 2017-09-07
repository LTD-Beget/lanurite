export interface IEvent {
    on(event: string, handler: any): any;
    trigger(eventName: string, event: any): any;
    off(event: string): any;
}
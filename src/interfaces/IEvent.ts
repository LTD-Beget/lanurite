export interface IEvent {
    on(event: string | Array<string>, handler: any): void
    trigger(eventName: string, event: any): void
    off(event: string): void
}
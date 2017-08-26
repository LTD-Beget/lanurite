export interface baseEvents{
    on(event: string, handler: any);
    trigger(eventName: string, event: any);
    off(event: string)
}
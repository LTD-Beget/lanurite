export interface baseModel {
    get(property: string | number): any;
    set(property: string | number, value: any): void
    hasProperty(property: string | number): boolean
    on(eventName: string, handled: void): void
    trigger(eventName: string, eventParams: any): void
    off(eventName: string): void
}
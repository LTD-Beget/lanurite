export interface IModel {
    get(property: string | number): any;
    set(property: string | number, value: any): void;
    has(property: string | number): boolean;
    drop(property: string | number): boolean;
    destroy(): void;
    reset(object: any): void;
    toJSON(): any;
}

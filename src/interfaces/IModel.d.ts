export interface IModel {
    get(property: string | number): any;
    set(property: string | number, value: any): void;
    hasProperty(property: string | number): boolean;
}

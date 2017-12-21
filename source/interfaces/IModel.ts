export interface IModel {
    get(property: string): any
    set(property: string, value: any): void
    has(property: string): boolean
    drop(property: string): boolean
    destroy(): void
    reset(object: { [key: string]: any }): void
    toJSON(): any
}

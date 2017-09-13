export interface IHandler {
    (param: {} | undefined | null): void
    name: string | undefined | null
}
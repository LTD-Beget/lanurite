import { IEvent } from "../interfaces/IEvent"
import { IHandler } from "../interfaces/IHandler"
export class Event implements IEvent {

    protected _events: { [event: string]: Array<IHandler> } = {}

    /**
     * Add handler on Event
     * @param eventsName
     * @param handler
     */
    public on(eventsName: string | Array<string>, handler: IHandler): void {
        if (Array.isArray(eventsName)) {
            return eventsName.forEach((event) => {
                this._createEvent(event, handler)
            })
        }
        return this._createEvent(eventsName, handler)
    }

    private _createEvent(event: string, handler: IHandler): void {
        if (Event._isUndefined(this._events[event])) {
            this._events[event] = [handler]
            return
        }
        this._events[event].push(handler)
    }

    /**
     * Remove handler from Event
     * @param eventName
     * @param handler
     */
    public off(eventName: string, handler?: IHandler): void {
        if (handler && handler.name && handler.name.length) {
            this._events[eventName] = this._events[eventName].filter((callback) => {
                return callback.name !== handler.name
            })
            return
        }
        delete this._events[eventName]
    }

    /**
     * Trigger Event with Param
     * @param eventName
     * @param eventParams
     */
    public trigger(eventName: string, eventParams: {} | undefined | null = {}): void {
        if (!Event._isUndefined(this._events[eventName])) {
            this._events[eventName].forEach((handler) => {
                handler(eventParams)
            })
        }
    }

    protected _offAllListener(): void {
        delete this._events
    }

    protected static _isUndefined(obj: any) {
        return obj === void 0
    }
}

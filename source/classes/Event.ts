import { IEvent, IHandler } from "../interfaces"
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
    public off(eventName: string | Array<string>, handler?: IHandler): void {
        let events: Array<string> = []
        if (Array.isArray(eventName)) {
            events = events.concat(eventName)
        } else {
            events.push(eventName)
        }
        if (handler) {
            return events.forEach((event) => {

                const index = this._events[event].indexOf(handler)
                if (index > -1) {
                    this._events[event].splice(index, 1)
                }
                if (!this._events[event].length) {
                    delete this._events[event]
                }

            })
        }
        events.forEach((event) => {
            delete this._events[event]
        })
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

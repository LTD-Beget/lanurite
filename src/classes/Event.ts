import * as _ from "lodash"
import {IEvent} from "../interfaces/IEvent"
class Event implements IEvent {

    protected _events: any = {}

    /**
     * Add handler for events array or string
     * @param eventsName
     * @param handler
     */
    public on(eventsName: string | Array<string>, handler: any) {
        if (_.isArray(eventsName)) {
            return eventsName.forEach((event) => {
                this._createEvent(event, handler)
            })
        }
        return this._createEvent(eventsName, handler)
    }

    private _createEvent(event: string, handler: any) {
        if (_.isUndefined(this._events[event])) {
            return this._events[event] = [handler]
        }
        this._events[event].push(handler)
    }

    /**
     * Remove all handler from eventName, or remove same handler from event
     * @param eventName
     * @param handler
     */
    public off(eventName: string, handler?: any) {
        if (handler && handler.name.length) {
            this._events[eventName] = this._events[eventName].filter((callback) => {
                return callback.name !== handler.name
            })
            return
        }
        return delete this._events[eventName]
    }

    /**
     * Triggered event
     * @param eventName
     * @param eventParams
     */
    public trigger(eventName: string, eventParams: any = {}) {
        if (!_.isUndefined(this._events[eventName])) {
            this._events[eventName].forEach((handler) => {
                handler(eventParams)
            })
        }
    }

    protected _offAllListener() {
        delete this._events
    }
}

export {Event}
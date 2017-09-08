import * as _ from "lodash";
import {IEvent} from "../interfaces/IEvent";
class Event implements IEvent {

    protected _events: any = {};

    on(eventName: string, handler: any) {
        if (_.isUndefined(this._events[eventName])) {
            return this._events[eventName] = [handler]
        }
        this._events[eventName].push(handler)
    }

    off(eventName: string, handler?: any) {
        if (handler && handler.name.length) {
            this._events[eventName] = this._events[eventName].filter((callback) => {
                return callback.name !== handler.name
            });
            return;
        }
        return delete this._events[eventName];
    }

    trigger(eventName: string, eventParams: any = {}) {
        if (!_.isUndefined(this._events[eventName])) {
            this._events[eventName].forEach((handler) => {
                handler(eventParams)
            })
        }
    }
}

export {Event}
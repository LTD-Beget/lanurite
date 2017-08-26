import {baseEvents} from "../base/events";
import * as _ from "lodash";
class EventsLr implements baseEvents {

    public _events: any;

    constructor() {
        this._events = {};
    }

    on(eventName: string, handler: any) {
        if (_.isUndefined(this._events[eventName])) {
            return this._events[eventName] = [handler]
        }
        this._events[eventName].push(handler)
    }

    off(eventName: string) {
        delete this._events[eventName];
    }

    trigger(eventName: string, eventParams: any = {}) {
        if (!_.isUndefined(this._events[eventName])) {
            this._events[eventName].forEach((handler) => {
                handler(eventParams)
            })
        }
    }
}

export {EventsLr}
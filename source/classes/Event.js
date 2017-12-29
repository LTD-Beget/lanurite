"use strict";
exports.__esModule = true;
var Event = (function () {
    function Event() {
        this._events = {};
    }
    /**
     * Add handler on Event
     * @param eventsName
     * @param handler
     */
    Event.prototype.on = function (eventsName, handler) {
        var _this = this;
        if (Array.isArray(eventsName)) {
            return eventsName.forEach(function (event) {
                _this._createEvent(event, handler);
            });
        }
        return this._createEvent(eventsName, handler);
    };
    Event.prototype._createEvent = function (event, handler) {
        if (Event._isUndefined(this._events[event])) {
            this._events[event] = [handler];
            return;
        }
        this._events[event].push(handler);
    };
    /**
     * Remove handler from Event
     * @param eventName
     * @param handler
     */
    Event.prototype.off = function (eventName, handler) {
        if (handler) {
            var index = this._events[eventName].indexOf(handler);
            if (index > -1) {
                this._events[eventName].splice(index, 1);
            }
            return;
        }
        delete this._events[eventName];
    };
    /**
     * Trigger Event with Param
     * @param eventName
     * @param eventParams
     */
    Event.prototype.trigger = function (eventName, eventParams) {
        if (eventParams === void 0) { eventParams = {}; }
        if (!Event._isUndefined(this._events[eventName])) {
            this._events[eventName].forEach(function (handler) {
                handler(eventParams);
            });
        }
    };
    Event.prototype._offAllListener = function () {
        delete this._events;
    };
    Event._isUndefined = function (obj) {
        return obj === void 0;
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map
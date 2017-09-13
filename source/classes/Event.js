"use strict";
exports.__esModule = true;
var Event = (function () {
    function Event() {
        this._events = {};
    }
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
    Event.prototype.off = function (eventName, handler) {
        if (handler && handler.name && handler.name.length) {
            this._events[eventName] = this._events[eventName].filter(function (callback) {
                return callback.name !== handler.name;
            });
            return;
        }
        delete this._events[eventName];
    };
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
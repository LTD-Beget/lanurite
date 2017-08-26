import {baseModel} from "../base/model";
import * as _ from "lodash";
import {baseCollection} from "../base/collection";
import {EventsLr} from "../events/Events";
class Models extends EventsLr implements baseModel {

    private _model: any;

    constructor(obj: any = {}) {
        super();
        this._model = _.assign({}, {l_id: _.uniqueId("lr_"), collection: null}, obj)
    }


    get(key: string) {
        return this._model[key]
    }

    set(key: string, value: any) {
        if (this.hasProperty(key)) {
            let oldValue = this.get(key)
            this._model[key] = value;
            this.trigger("change", {name: key, value: value, oldValue: oldValue});
        } else {
            this._model[key] = value;
            this.trigger("set", {name: key, value: value});
        }
    }

    hasProperty(key: string) {
        return !_.isUndefined(this._model[key])
    }


    _unsetCollection() {
        this._model["collection"] = null
    }

    _setCollection(collection: baseCollection) {
        this._model["collection"] = collection;
    }

    getCollection() {
        return this.get("collection")
    }
}
export {Models}

import * as _ from "lodash";
import {IModel} from "../interfaces/IModel";
import {Event} from "./Event"
class Model extends Event implements IModel{

    private _model: any;

    constructor(obj: any = {}) {
        super();
        this._model = _.assign({}, {l_id: _.uniqueId("lr_")}, obj)
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

    toJSON(): any{
        return _.clone(this._model);
    }

}
export {Model}

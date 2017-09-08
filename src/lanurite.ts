import * as _ from "lodash"
import {Collection} from "./classes/Collection"
import {Model} from "./classes/Model"

declare const __VERSION__: string
export = {
    Collection,
    Model,
    lodash: _,
    version: __VERSION__
}

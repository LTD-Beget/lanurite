import {Model} from "./classes/Model";
import {Collection} from "./classes/Collection";
import * as _ from "lodash";

declare const __VERSION__: string;
export = {
    Model: Model,
    Collection: Collection,
    version: __VERSION__,
    lodash: _
};

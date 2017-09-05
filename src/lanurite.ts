import {Models} from "./type/Models";
import {Collections} from "./type/Collections";
import * as _ from "lodash";

declare const __VERSION__: string;
export = {
    models: Models,
    collections: Collections,
    version: __VERSION__,
    lodash: _
};

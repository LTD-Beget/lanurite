/// <reference types="lodash" />
import { Models } from "./type/Models";
import { Collections } from "./type/Collections";
import * as _ from "lodash";
declare const _default: {
    models: typeof Models;
    collections: typeof Collections;
    version: string;
    lodash: _.LoDashStatic;
};
export = _default;

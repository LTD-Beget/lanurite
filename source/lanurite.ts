import { Collection } from "./classes/Collection"
import { Model } from "./classes/Model"
import { SortedCollection } from "./classes/SortedCollection"

declare const __VERSION__: string

export = {
    Collection,
    Model,
    SortedCollection,
    version: __VERSION__
}

export declare type IPredicate = (param: {} | undefined | null) => any;
export declare type IReducePredicate<T, TResult> = (accumulator: TResult, iteration: T, index: number, list: ArrayLike<T>) => TResult;

import type { ActionResult, Reference, ReferencableActionResult } from '../types';
export declare function collection<T, K, P extends {
    id: string;
}, R extends ReferencableActionResult<P, K>>(target: T, params: P[] | undefined, factory: (target: T, params: P) => R, reference: (params: P) => Reference<K> | undefined): ActionResult<P[] | undefined>;

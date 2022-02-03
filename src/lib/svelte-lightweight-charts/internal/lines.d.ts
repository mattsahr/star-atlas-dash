import type { IPriceLine, ISeriesApi, SeriesType } from 'lightweight-charts';
import type { ActionResult, PriceLineParams, ReferencableActionResult } from '../types';
export declare type PriceLineActionResult = ReferencableActionResult<PriceLineParams, IPriceLine>;
export declare function linesCollection<T extends SeriesType>(target: ISeriesApi<T>, params?: PriceLineParams[]): ActionResult<PriceLineParams[] | undefined>;
export declare function line<T extends SeriesType>(target: ISeriesApi<T>, params: PriceLineParams): PriceLineActionResult;

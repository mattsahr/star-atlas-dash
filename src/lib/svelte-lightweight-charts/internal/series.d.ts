import type { IChartApi, ISeriesApi } from 'lightweight-charts';
import type { ActionResult, ReferencableActionResult, SeriesActionParams } from '../types';
export declare type SeriesParams = Omit<SeriesActionParams, 'reference'>;
export declare type SeriesActionResult<T extends SeriesParams> = ReferencableActionResult<T, ISeriesApi<T['type']>>;
export declare function seriesCollection(target: IChartApi, params?: SeriesActionParams[]): ActionResult<SeriesActionParams[] | undefined>;
export declare function series<T extends SeriesParams>(target: IChartApi, params: T): SeriesActionResult<T>;

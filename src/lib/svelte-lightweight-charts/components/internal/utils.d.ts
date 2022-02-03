import type { IChartApi, IPriceLine, ISeriesApi, SeriesType } from '../../../lightweight-charts/lightweight-charts.esm.development.js';
import type { PriceLineParams, Reference } from '../../types';
import { SeriesParams } from '../../internal/series';
export declare type Context = IChartApi | ISeriesApi<SeriesType>;
export declare function context<T extends Context>(value: T): void;
export declare function context<T extends Context>(): T;
export declare function useSeriesEffect<T extends SeriesParams>(callback: () => [params: T, ref?: Reference<ISeriesApi<T['type']>>]): void;
export declare function useLineEffect(callback: () => [params: PriceLineParams, ref?: Reference<IPriceLine>]): void;

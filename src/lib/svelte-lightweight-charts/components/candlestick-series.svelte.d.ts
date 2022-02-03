import { SvelteComponentTyped } from 'svelte';
import type {
    CandlestickSeriesPartialOptions,
    ISeriesApi,
    SeriesDataItemTypeMap
} from '../../lightweight-charts/lightweight-charts.esm.development.js';
import type {Reference} from '../types';

export interface $$PROPS extends CandlestickSeriesPartialOptions {
    ref?: Reference<ISeriesApi<'Candlestick'>>;
    data: SeriesDataItemTypeMap['Candlestick'][];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface $$EVENTS {

}

export default class CandlestickSeries extends SvelteComponentTyped<$$PROPS, $$EVENTS> {}
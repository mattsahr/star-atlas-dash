import { SvelteComponentTyped } from 'svelte';
import type {
    HistogramSeriesPartialOptions,
    ISeriesApi,
    SeriesDataItemTypeMap
} from '../../lightweight-charts/lightweight-charts.esm.development.js';
import type {Reference} from '../types';

export interface $$PROPS extends HistogramSeriesPartialOptions {
    ref?: Reference<ISeriesApi<'Histogram'>>;
    data: SeriesDataItemTypeMap['Histogram'][];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface $$EVENTS {

}

export default class HistogramSeries extends SvelteComponentTyped<$$PROPS, $$EVENTS> {}
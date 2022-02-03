import { SvelteComponentTyped } from 'svelte';
import type {
    BarSeriesPartialOptions,
    ISeriesApi,
    SeriesDataItemTypeMap
} from '../../lightweight-charts/lightweight-charts.esm.development.js';
import type {Reference} from '../types';

export interface $$PROPS extends BarSeriesPartialOptions {
    ref?: Reference<ISeriesApi<'Bar'>>;
    data: SeriesDataItemTypeMap['Bar'][];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface $$EVENTS {

}

export default class BarSeries extends SvelteComponentTyped<$$PROPS, $$EVENTS> {}
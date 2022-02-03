import { SvelteComponentTyped } from 'svelte';
import type {
    AreaSeriesPartialOptions,
    ISeriesApi,
    SeriesDataItemTypeMap
} from '../../lightweight-charts/lightweight-charts.esm.development.js';
import type {Reference} from '../types';

export interface $$PROPS extends AreaSeriesPartialOptions {
    ref?: Reference<ISeriesApi<'Area'>>;
    data: SeriesDataItemTypeMap['Area'][];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface $$EVENTS {

}

export default class AreaSeries extends SvelteComponentTyped<$$PROPS, $$EVENTS> {}
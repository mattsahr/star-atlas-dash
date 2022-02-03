import { SvelteComponentTyped } from 'svelte';
import type {
    IChartApi,
    ChartOptions,
    DeepPartial,
    MouseEventParams
} from '../../lightweight-charts/lightweight-charts.esm.development.js';
import type {Reference} from '../types';

export interface $$PROPS extends DeepPartial<ChartOptions> {
    ref?: Reference<IChartApi>;
}

export interface $$EVENTS {
    crosshairMove: MouseEventParams,
    click: MouseEventParams,
}

export default class Chart extends SvelteComponentTyped<$$PROPS, $$EVENTS> {}
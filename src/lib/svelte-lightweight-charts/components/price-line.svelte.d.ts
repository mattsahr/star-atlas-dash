import { SvelteComponentTyped } from 'svelte';
import type {
    PriceLineOptions, IPriceLine
} from '../../lightweight-charts/lightweight-charts.esm.development.js';
import type {Reference} from '../types';

export interface $$PROPS extends PriceLineOptions {
    ref?: Reference<IPriceLine>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface $$EVENTS {

}

export default class PriceLine extends SvelteComponentTyped<$$PROPS, $$EVENTS> {}
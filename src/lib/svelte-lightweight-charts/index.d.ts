import { ChartOptions, DeepPartial, IChartApi, MouseEventHandler } from 'lightweight-charts';
import type { ActionResult, Reference, SeriesActionParams } from './types';
export interface ChartActionParams<T extends Array<SeriesActionParams>> {
    options?: DeepPartial<ChartOptions>;
    series?: T;
    reference?: Reference<IChartApi>;
    onClick?: MouseEventHandler;
    onCrosshairMove?: MouseEventHandler;
}
export declare function chart<T extends Array<SeriesActionParams>>(node: HTMLElement, params: ChartActionParams<T>): ActionResult<ChartActionParams<T>>;
export default chart;

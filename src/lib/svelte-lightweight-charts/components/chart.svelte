<svelte:options immutable={true}/>

<script >;
;
;
import { createEventDispatcher } from 'svelte';
import ContextProvider from './internal/context-provider.svelte';
import { chart } from '../index';
const dispatch = createEventDispatcher();
/** Height of the chart */
export let width = 0;
/** Width of the chart */
export let height = 0;
/** Structure with watermark options */
export let watermark = undefined;
/** Structure with layout options */
export let layout = undefined;
/** Structure with price scale option for left price scale */
export let leftPriceScale = undefined;
/** Structure with price scale option for right price scale */
export let rightPriceScale = undefined;
/** Structure describing default price scale options for overlays */
export let overlayPriceScales = undefined;
/** Structure with time scale options */
export let timeScale = undefined;
/** Structure with crosshair options */
export let crosshair = undefined;
/** Structure with grid options */
export let grid = undefined;
/** Structure with localization options */
export let localization = undefined;
/** Structure that describes scrolling behavior or boolean flag that disables/enables all kinds of scrolls */
export let handleScroll = undefined;
/** Structure that describes scaling behavior or boolean flag that disables/enables all kinds of scales */
export let handleScale = undefined;
export let ref = undefined;
let options = undefined;
$: options = {
    width,
    height,
    watermark,
    layout,
    leftPriceScale,
    rightPriceScale,
    overlayPriceScales,
    timeScale,
    crosshair,
    grid,
    localization,
    handleScroll,
    handleScale,
};
let reference = null;
let handleReference = undefined;
$: handleReference = (chart) => {
    reference = chart;
    if (ref !== undefined) {
        ref(chart);
    }
};
function handleCrosshairMove(params) {
    dispatch('crosshairMove', params);
}
function handleClick(params) {
    dispatch('click', params);
}
</script>

<div use:chart={{
    options,
    onCrosshairMove: handleCrosshairMove,
    onClick: handleClick,
    reference: handleReference,
}}>
    {#if reference !== null}
        <ContextProvider value={reference}><slot/></ContextProvider>
    {/if}
</div>

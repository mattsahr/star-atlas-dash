<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import { CrosshairMode } from 'lightweight-charts';
    import Chart from "svelte-lightweight-charts/components/chart.svelte";
    import LineSeries from "svelte-lightweight-charts/components/line-series.svelte";
    // import CandlestickSeries from '../lib/svelte-lightweight-charts/components/candlestick-series.svelte';
    import { shipTrades } from '../data/app-store.js';

    const baseOptions = {
        width: 280,
        height: 280,
        layout: {
            backgroundColor: '#faf9f8',
            textColor: 'rgba(80, 80, 80, 1)'
        },
        crosshair: {
            mode: CrosshairMode.Normal
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 1)'
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 1)',
            barSpacing: 4,
            rightOffset: 1,
            timeVisible: true
        }
    };

    const lineOptions = {
        color: 'rgb(230, 120, 0)',
        lineWidth: 2
    };

    export let ship;
    export let quotePair;
    export let width = 280;
    export let height = 280;

    $: trades = $shipTrades[ship.id];
    $: tradeData = trades ? _cloneDeep(trades[quotePair]) : [];
    $: options = { ...baseOptions, width, height };

    // $: { console.log('tradeData',  quotePair, '  w', width, '  height', height); 
    //      console.log('tradeData', (!tradeData ? 'NONE' : tradeData.length), tradeData); }


    /*
    const candleStickOptions = {
        ...baseOptions,
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 1)',
            barSpacing: 16,
            rightOffset: 2
        }
    };
    */

    /*
    <CandlestickSeries
        data={tradeData}
        upColor="rgba(255, 144, 0, 1)"
        downColor="#000"
        borderDownColor="rgba(255, 144, 0, 1)"
        borderUpColor="rgba(255, 144, 0, 1)"
        wickDownColor="rgba(255, 144, 0, 1)"
        wickUpColor="rgba(255, 144, 0, 1)"
    />
    */

</script>

{#if tradeData && tradeData.length}
    {#key tradeData}
        <div class="trade-chart-wrapper">
            <Chart {...options}>
                <LineSeries {...lineOptions}
                    data={tradeData} />
            </Chart>
            <div class="legend">{quotePair}</div>
        </div>
    {/key}
{/if}

<style>
    .trade-chart-wrapper {
        position:  relative;
        /* border: solid 1px rgb(255, 220, 0); */
        padding: 20px 0 20px 0;
    }
    .legend {
        position: absolute;
        top: 6px;
        left: 6px;
        background-color: rgba(250, 249, 248,0.5);
        padding: 4px 8px;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 700;
        z-index: 10;
        pointer-events: none;
    }
</style>
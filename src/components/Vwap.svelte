<script>
    import { formatUSDC } from '../util/text-format.js';
    import { tokenPrices } from '../data/app-store.js';
    import { shipTrades } from '../data/app-store.js';
    import PercentDisplay from './percent-display.svelte';

    export let ship;
    export let className = '';

    $: vwapClass = 'vwap-wrapper' + (className ? ' ' + className : '');
    $: trades = $shipTrades[ship.id];
    $: tradeData = trades && trades.USDC ? trades.USDC : [];
    $: lastTrade = tradeData[tradeData.length - 1] ? tradeData[tradeData.length - 1].value : 0;
    $: vwap = ship.tradeSettings.vwap;
    $: diff = (Number(lastTrade) - vwap)/vwap;
    $: premimum = diff < 0 ? 'Discount vs Retail' : 'Premium to Retail';

    // $: { 
    //         console.log('tradeData', tradeData, ' lastTrade', lastTrade);
    //         console.log('vwap', vwap, ' diff', diff);
    //     }


</script>

    <div class={vwapClass}>

        {#if lastTrade}
            <div class="premium">
                <div class="label">{premimum}</div>
                <PercentDisplay num={diff} />
            </div>
        {/if}
        <div class="column one">
            <div class="vwap">
                <div class="label">Retail (<span class="small">VWAP</span>)</div>
                <div class="value">{formatUSDC(vwap)}</div>
                <span class="currency-mark">USDC</span>
            </div>
        </div>
        {#if lastTrade}
            <div class="column two">
                <div class="last-trade">
                    <div class="label">Latest Trade</div>
                    <div class="value">{formatUSDC(lastTrade)}</div>
                    <span class="currency-mark">USDC</span>
                </div>
            </div>
        {/if}

    </div>


<style>
    .vwap-wrapper {
        font-size: 17px;
        text-align: right;
        margin: 0;
        padding: 20px 0 0 0;
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        width:  280px;
        border: solid 1px rgb(200, 200, 200);
        border-radius: 2px;
    }

    .column {
        box-sizing: border-box;
        width: 50%;

        border: solid rgb(220, 220, 220);
        border-width: 1px 0 0 0;
    }

    .column.one {
        padding: 20px 24px 0 24px;
    }

    .column.two {
        border-left-width: 1px;
        padding: 20px 24px 0 20px;
    }

    .vwap,
    .last-trade,
    .premium {
        line-height: 16px;
        margin: 0 0 8px 0;
        padding: 0 0 4px 0;
    }

    .premium {
        border: none;
        padding: 0 24px 10px 0;
        margin: 0;
        width: 100%
    }

    .label {
        font-size: 11px; 
        font-style: italic; 
        text-transform: uppercase;
        color: #a0b0c0;
        display: block;
        width: 100%;
        margin: 0 0 1px 0;
    }

    .small {
        font-size: 0.9em;
    }

    .value {
        letter-spacing: 0.01em;
        margin-left: -100px;
    }

    .currency-mark {
        display: block;
        font-size: 11px; 
        text-transform: uppercase;
        color: #a0b0c0;
        width: 100%;
        margin: -1px 0 0 0;
    }

</style>
<script>
    import IoLogoUsd from 'svelte-icons/io/IoLogoUsd.svelte';
    import { formatAtlas, formatUSDC } from '../util/text-format.js';

    export let column;
    export let rowNumber;
    export let row;
    export let customClass;

    $: askATLAS = row.data.askATLAS;
    $: bidATLAS = row.data.bidATLAS;
    $: askUSDC = row.data.askUSDC;
    $: bidUSDC = row.data.bidUSDC;
    $: askAtlasEq = row.data.askAtlasEq;
    $: bidAtlasEq = row.data.bidAtlasEq;

    $: val = row.data[column.dataName];
    $: odd = Boolean(rowNumber % 2);
    $: cellClass = 'ask-bid-grid ' + 
        (odd ?  'odd' : 'even') + 
        (customClass ? (' ' + customClass) : '') + 
        (column.sortDirection ? ' sorted' : '') + 
        ((column.currency === 'usdc') ? ' usdc' : '');

</script>

{#if column.currency === 'atlas'}
    <div class={cellClass}>
        <div class='ask-row'>
            <div class='ask-bid-cell primary'>
                <div class="market-position">Ask</div>
                <div class="price-number">{formatAtlas(askATLAS)}</div>
            </div>
            <div class='ask-bid-cell converted'>
                <div class="currency-mark">$</div>
                <div class="price-number">{formatUSDC(askAtlasEq)}</div>
            </div>
        </div>
        <div class='bid-row'>
            <div class='ask-bid-cell primary'>
                <div class="market-position">Bid</div>
                <div class="price-number">{formatAtlas(bidATLAS)}</div>
            </div>
            <div class='ask-bid-cell converted'>
                <div class="currency-mark">$</div>
                <div class="price-number">{formatUSDC(bidAtlasEq)}</div>
            </div>
        </div>
    </div>
{:else if column.currency === 'usdc'}
    <div class={cellClass}>
        <div class='ask-row'>
            <div class='ask-bid-cell primary'>
                <div class="market-position">Ask</div>
                {#if customClass}<div class="currency-mark">$</div>{/if}
                <div class="price-number">{formatUSDC(askUSDC)}</div>
            </div>
        </div>
        <div class='bid-row'>
            <div class='ask-bid-cell primary'>
                <div class="market-position">Bid</div>
                {#if customClass}<div class="currency-mark">$</div>{/if}
                <div class="price-number">{formatUSDC(bidUSDC)}</div>
            </div>
        </div>
    </div>
{/if}

<style>
    .ask-bid-grid {
        font-size: 13px;
        line-height: 15px;
        padding: 8px 0 0 0;
        height: 60px;
    }

    .ask-bid-grid.ship-card {
        padding: 12px 0 0 0;
        border: solid rgb(200, 200, 200);
        border-width: 0 0 1px 0;
        margin: 0px 0 0 14px;
        height: 58px;
    }

    .ask-row {
        padding: 0 6px 0 6px;
        width: 100%;
        display: flex;
    }

    .bid-row {
        padding: 6px 6px 0 6px;
        width: 100%;
        display: flex;
    }

    .ask-bid-cell {
        display: flex;
        position: relative;
    }

    .ask-bid-cell.primary {   width: 52%; }
    .ask-bid-cell.converted { width: 48%; }

    .ship-card .ask-bid-cell.primary {   
        width: 48%; 
    }
    .ship-card .ask-bid-cell.converted { 
        width: 52%;
        padding-right: 9px 
    }

    .ask-bid-cell.primary {
        justify-content: space-between;
        padding: 0 6px 0 6px;
    }

    .ask-bid-cell.converted {
        justify-content: flex-end;
        padding:  0 6px 0 0;
    }

    .market-position {
        margin: 1px 0 0 0;
        text-transform: uppercase;
        color: rgb(170, 180, 180);
        font-size: 0.9em;
        line-height: 1.1;
    }


    .price-number {
        z-index: 20;
    }

    .ask-bid-cell.converted .price-number {
        color: rgb(170, 180, 180);
    }

    .currency-mark {
        position: absolute;
        top: 0;
        left: 10px;
        height: 15px;
        width: 15px;
        font-size: 15px;
        pointer-events: none;
        color: rgb(200, 220, 210);
        line-height: 1;
        z-index: 10;
    }

    /* ============ USDC CELLS ================== */

    .usdc .ask-bid-cell.primary {   width: 100%; }
    .usdc .ask-bid-cell.converted { width: 0; }    

    .usdc .ask-bid-cell.primary {
        padding: 0 10px 0 8px;
    }

    .usdc .currency-mark {
        left: inherit;
        right:  10px;
    }

    .ship-card.usdc .currency-mark {
        left: 101px;
        right: inherit;
    }

    /* ========================================== */


</style>
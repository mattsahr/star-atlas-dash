<script>
    import { fade } from 'svelte/transition';
    import tippy from 'tippy.js';
    import { formatAtlas, formatUSDC } from '../util/text-format.js';
    import { tokenPrices } from '../data/app-store.js';

    export let ship;
    export let priceClass = 'price-ask-bid';

    const composeConversion = (conversion, text, val) => {
        if (!conversion) { return 0; }

        return '<span class="market-position">' + text +'</span>' +
            (formatUSDC(Number(val) * conversion)) +
            '<span class="currency-mark">USDC</span>';
    };

    const tooltipParams = { 
        allowHTML: true,
        delay: [200, 100],
        offset: [-18, -8], 
        placement: 'top'
    };

    function tooltip(node, params) {
        let tip = tippy(node, params);
        return {
            update: (newParams) => {
                tip.setProps(newParams);
            },
            destroy: () => {
                tip.destroy();
            }
        };
    }

    $: askATLAS = ship.prices ? ship.prices.askATLAS || 0 : 0;
    $: askUSDC = ship.prices ? ship.prices.askUSDC || 0 : 0;
    $: bidATLAS = ship.prices ? ship.prices.bidATLAS || 0 : 0;
    $: bidUSDC = ship.prices ? ship.prices.bidUSDC || 0 : 0;

    $: conversion = $tokenPrices['ATLAS/USDC'] || 0;
    $: askAtlasEq = composeConversion(conversion, 'ask', askATLAS);
    $: bidAtlasEq = composeConversion(conversion, 'bid', bidATLAS);;

</script>

{#if ship.prices}
    <div class={priceClass}>
        <div class="ship-price">

            {#if conversion}
                <div class="price-atlas" use:tooltip={{ ...tooltipParams, content: askAtlasEq}}>
                    {#key askATLAS}
                    <div class="internal" in:fade="{{ duration: 1000, start: 0.4, amount: 8 }}">
                        <span class="market-position">Ask</span>
                        <span class="market-number">{formatAtlas(askATLAS)}</span>
                        <span class="currency-mark">Atlas</span>
                    </div>
                    {/key}
                </div>
            {:else}
                <div class="price-atlas">
                    {#key askATLAS}
                    <div class="internal" in:fade="{{ duration: 1000, start: 0.4, amount: 8 }}">
                        <span class="market-position">Ask</span>
                        <span class="market-number">{formatAtlas(askATLAS)}</span>
                        <span class="currency-mark">Atlas</span>
                    </div>
                    {/key}
                </div>
            {/if}

            <div class="price-usdc">
                {#key askUSDC}
                <div class="internal" in:fade="{{ duration: 1000, start: 0.4, amount: 8 }}">
                    <span class="market-position">Ask</span>
                    <span class="market-number">{formatUSDC(askUSDC)}</span>
                    <span class="currency-mark">USDC</span>
                </div>
                {/key}
            </div>
        </div>
        <div class="ship-price row-2">

            {#if conversion}
                <div class="price-atlas" use:tooltip={{ ...tooltipParams, content: bidAtlasEq}}>
                    {#key bidATLAS}
                    <div class="internal" in:fade="{{ duration: 1000, start: 0.4, amount: 8 }}">
                        <span class="market-position">Bid</span>
                        <span class="market-number">{formatAtlas(bidATLAS)}</span>
                        <span class="currency-mark">Atlas</span>
                    </div>
                    {/key}
                </div>
            {:else}
                <div class="price-atlas">
                    {#key bidATLAS}
                    <div class="internal" in:fade="{{ duration: 1000, start: 0.4, amount: 8 }}">
                        <span class="market-position">Bid</span>
                        <span class="market-number">{formatAtlas(bidATLAS)}</span>
                        <span class="currency-mark">Atlas</span>
                    </div>
                    {/key}
                </div>
            {/if}

            <div class="price-usdc">
                {#key bidUSDC}
                <div class="internal" in:fade="{{ duration: 1000, start: 0.4, amount: 8 }}">
                    <span class="market-position">Bid</span>
                    <span class="market-number">{formatUSDC(bidUSDC)}</span>
                    <span class="currency-mark">USDC</span>
                </div>
                {/key}
            </div>
        </div>
    </div>
{/if}


<style>
    .right-column {
        width: calc(64% + 14px);
        margin-left: -4%;
        margin-right: -14px;
    }

    .ship-price { 
        font-size: 16px; 
        margin: 2px 0 0 0;
        display:  flex;
        width: 100%;
    }

    .ship-price.row-2 {
        margin-top:  0;
    }

    .price-usdc, 
    .price-atlas {
        position: relative;
        display:  block;
        height: 44px;
        text-align:  right;
        padding: 6px 0 6px 6px;
        width: 50%;
    }
    .price-atlas {
        border: solid #b0b0b0;
        border-width: 0 1px 0 0;
        padding: 6px 12px 6px 6px;
    }

    .price-atlas .internal,
    .price-usdc .internal {
        position: absolute;
        right:  14px;
    } 

/* ------ Ships Grid Page  ------- */
        .right-column .price-usdc, 
        .right-column .price-atlas {
            height: 56px;
            padding-top: 8px;
        }
/* ------------------------------- */


/* ------ Feature Ship Page ------ */
        .price-ask-bid .price-atlas .internal{
            right: 28px;
        }
        .price-ask-bid .price-usdc .internal {
            right: 18px;
        }
/* ------------------------------- */

    .capitalize {
        text-transform: capitalize;
    }

    .market-position {
        font-size: 10px; 
        font-style: italic; 
        margin: 0 4px 0 0; 
        text-transform: uppercase;
        color: #a0b0c0;
    }

    .market-position {
        display: block;
        width: 100%;
        margin: 0 0 -2px 0;
    }

    .market-number {
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
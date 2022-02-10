<script>
    import { tokenPrices } from '../data/app-store.js';
    import PercentDisplay from '../components/Percent-display.svelte';
    import { bind } from 'svelte-simple-modal';
    import { modalStatus } from '../data/app-store.js';
    import ChartLoader from '../layouts/Chart-loader.svelte';

    const clickHandler = market => () => {
        modalStatus.set(bind(ChartLoader, { message: market }));
    };

    const composePrices = (priceMap) => {
        const prices = [];

        const markets = Object.keys(priceMap)
            .filter(price => !price.startsWith('CLOSE '));

        for (const market of markets) {
            const price = priceMap[market];
            const close = priceMap['CLOSE ' + market];
            const diff = close ? (price - close)/close : 0;
            prices.push({
                market: market.split('/'), 
                price, close, diff
            });
        }
        return prices;
    };

    $: prices = composePrices($tokenPrices);


</script>

<div class="ticker-frame">
    <div class="ticker-column">
        {#each prices as ticker}
            <div class="ticker-group">
                <div class="market" on:click={clickHandler(ticker.market.join('/'))}>
                    {ticker.market[0]}<span class="slash">/</span>{ticker.market[1]}
                </div>
                <div class="price">{ticker.price}</div>
                <div class="diff">
                    <PercentDisplay className="ticker" num={ticker.diff} />
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .ticker-frame {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        justify-content: center;
        border: solid rgb(200, 200, 200);
        border-width: 1px 0 1px 0;
        background: rgb(246, 244, 243);
        overflow: hidden;
    }

    .ticker-column {
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: flex-start;
        padding: 0 0 0 12px;
    }

    .ticker-group {
        display: flex;
        justify-content: center;
        margin: 0 16px 0 0;
        padding: 0;
    }

    /*
    .ticker-group:not(:last-child) {
        border: solid rgb(200, 100, 0);
        border-width: 0 1px 0 0;
    }
    */

    .market {
        font-size: 12px;
        border: solid 1px rgb(100, 220, 220);
        border-width: 0 0 0 1px;
        background: rgb(230, 242, 245);
        color: rgb(0, 110, 140);
        font-weight: 700;
        margin: 0px 2px;
        padding: 4px 6px 4px 10px;
        cursor:  pointer;
    }

    .market:hover {
        background: rgb(210, 224, 230);
        color: rgb(0, 80, 110);
    }

    .slash {
        margin: 0 4px;
    }

    .price {
        font-size: 12px;
        border: solid 1px rgb(100, 220, 220);
        border-width: 0 1px 0 0;
        background: rgb(230, 242, 245);
        color: rgb(0, 110, 140);
        margin: 0 0 0 -2px;
        padding: 4px 12px;
    }

    .diff {
        margin: 0px 2px 0 0;
        padding: 4px 6px;
    }

</style>
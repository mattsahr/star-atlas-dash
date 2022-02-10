<script>
    import { columnSettings } from '../data/data-helpers.js';
    import CellAskBid from '../table/Cell-ask-bid.svelte';

    const columnAskATLAS = columnSettings.find(column => column.dataName === 'askATLAS');
    const columnAskUSDC = columnSettings.find(column => column.dataName === 'askUSDC');

    export let ship;
    export let priceClass = 'price-ask-bid';
</script>

<div class={priceClass}>
    <CellAskBid row={{data: ship}} customClass="ship-card" column={columnAskATLAS} />
    <CellAskBid row={{data: ship}} customClass="ship-card" column={columnAskUSDC} />
</div>


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


/* ------ Ships Grid Page  ------- 
        .right-column .price-usdc, 
        .right-column .price-atlas {
            height: 56px;
            padding-top: 8px;
        }
/* ------------------------------- */


/* ------ Feature Ship Page ------ 
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
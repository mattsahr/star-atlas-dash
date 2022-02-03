<script>
    import IoLogoUsd from 'svelte-icons/io/IoLogoUsd.svelte';
    import { formatUSDC } from '../util/text-format.js';

    export let column;
    export let rowNumber;
    export let row;

    $: val = row.data[column.dataName];
    $: odd = Boolean(rowNumber % 2);
    $: cellClass = 'market-number ' + 
        (odd ?  'odd' : 'even') + 
        (column.sortDirection ? ' sorted' : '') + 
        (column.parent ? ' parent' : '') +
        (column.child ? ' child' : '') +
        (column.dataName === 'vwap' ? ' vwap' : '');

</script>

<div class={cellClass}>
    <div class="currency-mark">$</div>
    <div class="number">{formatUSDC(val)}</div>
</div>

<style>

    .market-number {
        position: relative;
        font-size: 13px;
        text-align: right;
        padding: 0 12px 0 14px;
    }

    .market-number.child {
        opacity: 0.8;
        color: rgb(150, 154, 160);
    }

    .number {
        z-index: 20;
    }

    .currency-mark {
        position: absolute;
        top: 18px;
        left: 4px;
        height: 15px;
        width: 15px;
        font-size: 15px;
        pointer-events: none;
        color: rgb(200, 220, 210);
        line-height: 1;
        z-index: 10;
    }

    .market-number.child .currency-mark {
        top: 10px;
        left: 8px;
        font-size: 14px;
    }

    .market-number.vwap {
        padding: 0 11px 0 13px;
    }

</style>
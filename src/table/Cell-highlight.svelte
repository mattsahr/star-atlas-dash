<script>
    import { bind } from 'svelte-simple-modal';
    import { modalStatus } from '../data/app-store.js';
    import FeatureShip from '../layouts/Feature-ship.svelte';
    export let column;
    export let rowNumber;
    export let row;

    const clickHandler = () => {
        modalStatus.set(bind(FeatureShip, { message: row.data.id }));
    };

    $: val = row.data[column.dataName];
    $: odd = Boolean(rowNumber % 2);
    $: cellClass = 'cell-highlight ' + 
        (odd ?  'odd' : 'even') + 
        (column.sortDirection ? ' sorted' : '') + 
        (column.capitalize ? ' capitalize' : '');
    $: symbol = row.data.symbol;
</script>

{#if column.dataName === 'name'}
<div class={cellClass} on:click={clickHandler}>
    <div class="title">{val}</div>
    <div class="symbol">{symbol}</div>
</div>
{:else}
<div class={cellClass} on:click={clickHandler}>{val}</div>
{/if}

<style>
    .cell-highlight {
        font-size: 13px;
        padding: 0 12px 0 10px;
        cursor: pointer;
        font-weight: 700;
        height:  52px;
    }
    .cell-highlight.capitalize {
        text-transform: capitalize;
    }
    .title {
        line-height: 18px;
        padding: 7px 0 1px 0;
    }
    .symbol {
        font-weight:  300;
        line-height: 18px;
        color: rgb(120, 120, 120);
        font-size:  12px;
    }

</style>
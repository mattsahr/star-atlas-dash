<script>
    import PercentDisplay from '../components/Percent-display.svelte';
    export let column;
    export let rowNumber;
    export let row;
    export let customClass;

    const simplePercent = {
        'aprVWAP': true,
        'aprAskUSDC': true
    };

    $: val = row.data[column.dataName];
    $: odd = Boolean(rowNumber % 2);
    $: cellClass = 'cell-basic ' + 
        (odd ?  'odd' : 'even') + 
        (column.sortDirection ? ' sorted' : '') + 
        (customClass ? (' ' + customClass) : '') +
        (column.capitalize ? ' capitalize' : '');
    $: percentClass = simplePercent[column.dataName] 
        ? 'simple-table' + (customClass ? (' ' + customClass) : '')
        : 'table' + (customClass ? (' ' + customClass) : '');
</script>

{#if column.usePercent}
    <div class={cellClass}><PercentDisplay className={percentClass} num={val} /></div>
{:else}
    <div class={cellClass}>{val}</div>
{/if}

<style>
    .cell-basic {
        font-size: 13px;
        padding: 0 12px 0 14px;
    }
    .cell-basic.capitalize {
        text-transform: capitalize;
    }
    .cell-basic.ship-card {
        width:  38%;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        padding: 6px 0 2px 0;
    }
    .cell-basic.ship-card.narrow {
        width:  31%;
    }
</style>

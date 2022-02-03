<script>
    import { formatAtlas, formatUSDC } from '../util/text-format.js';
    import tippy from 'tippy.js';

    export let column;
    export let rowNumber;
    export let row;

    const composeConversion = (text, val) => {
        if (!val) { return 0; }
        return '<span class="market-position">' + text +'</span>' +
            (formatUSDC(Number(val))) +
            '<span class="currency-mark">USDC</span>';
    };

    const tooltipParams = { 
        allowHTML: true,
        delay: [200, 100],
        offset: [20, 0], 
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

    $: val = row.data[column.dataName];
    $: odd = Boolean(rowNumber % 2);
    $: cellClass = 'market-number ' + 
        (odd ?  'odd' : 'even') + 
        (column.sortDirection ? ' sorted' : '');
    $: askBid = column.dataName === 'askATLAS'
        ? 'Ask' 
        : column.dataName === 'bidATLAS'
            ? 'Bid'
            : '';  
    $: atlasUSDC = column.dataName === 'askATLAS' 
        ? composeConversion(askBid, row.data['askAtlasEq'])
        : column.dataName === 'bidATLAS' 
            ? composeConversion(askBid, row.data['bidAtlasEq'])
            : 0;

</script>

{#if atlasUSDC}
    <div class={cellClass + ' point'} use:tooltip={{ ...tooltipParams, content: atlasUSDC}}>
        {formatAtlas(val)}
    </div>
{:else} 
    <div class={cellClass}>
        {formatAtlas(val)}
    </div>
{/if}

<style>
    .market-number {
        font-size: 13px;
        text-align: right;
        padding: 0 12px 0 14px;
    }
    .market-number.point {
        cursor: default;
    }

</style>
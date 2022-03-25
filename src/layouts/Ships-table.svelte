<script>
    import { ASCEND, DESCEND } from '../util/constants.js';
    import { getDocHeight, getDocWidth } from '../util/dom.js';
    import DataGrid from '../lib/svelte-data-grid/svelte-data-grid.svelte';
    import { ships } from '../data/app-store.js';
    import { tokenPrices } from '../data/app-store.js';
    import {  buildSortData, composeColumns, composeShipData } from '../data/data-helpers';

    export let heightOffset = 0;
    let width;
    let height;
    let sortData = buildSortData();

    const composeClickHandler = dataName => e => { 
        sortData[dataName] = 
            sortData[dataName]  === ''
                ? ASCEND
                : sortData[dataName] === ASCEND
                    ? DESCEND
                    : '';
        for (const key of Object.keys(sortData)) {
            if (key !== dataName) {
                sortData[key] = '';
            }
        }

        sortData = { ...sortData };
    };

    const calcTableHeight = (shipList, padding) => {
        const nativeHeight = (((shipList.length || 1) * 53) + 56);
        return nativeHeight;
        /*
        const tooNarrow = getDocWidth() < 760;
        const tooShort = getDocHeight() < 600;
        if (tooNarrow || tooShort) {
            return nativeHeight;
        }

        return Math.min(
            (getDocHeight() - padding),
            nativeHeight
        );
        */
    };

    $: verticalPadding = 126 + heightOffset;
    $: gridColumns = !width ? [] : composeColumns(composeClickHandler, sortData);
    $: gridData = composeShipData($ships, gridColumns, sortData, $tokenPrices);
    $: gridWrapStyle = 'height: ' + calcTableHeight($ships, verticalPadding) + 'px;';

    // $: { console.log('TABLE w', width, '  h', height, '  tHeight', 
    // calcTableHeight($ships, verticalPadding), ' verPad', verticalPadding); }

</script>

<div class="grid-frame" style={gridWrapStyle}>
    <div class="grid-wrapper" 
        bind:clientWidth={width} bind:clientHeight={height}>
            <DataGrid 
                headerHeight={44}
                rowHeight={52}
                rows={gridData} 
                columns={gridColumns} 
                fixColumn={1}
                allowColumnReordering={false} />
    </div>
</div>

<style>
    .grid-frame {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 20px;
    }

    .grid-wrapper {
        text-align: left;
        width: 100%;
        max-width: 1390px;
    }

</style>
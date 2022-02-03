<script>
    import { onMount } from 'svelte';
    import { ASCEND, DESCEND } from '../util/constants.js';
    import DataGrid from '../lib/svelte-data-grid/svelte-data-grid.svelte';
    import TableHeader from '../table/Table-header.svelte';
    import TableHeaderUSDC from '../table/Table-header-usdc.svelte';
    import TableHeaderATLAS from '../table/Table-header-atlas.svelte';

    import CellAskBid from '../table/Cell-ask-bid.svelte';
    import CellATLAS from '../table/Cell-atlas.svelte';
    import CellBasic from '../table/Cell-basic.svelte';
    import CellHighlight from '../table/Cell-highlight.svelte';
    import CellImage from '../table/Cell-image.svelte';
    import CellUSDC from '../table/Cell-usdc.svelte';
    import { calc, sortBy } from '../util/helpers.js';
    import { CUSTOM_SORTS } from '../util/constants.js';

    import { ships } from '../data/app-store.js';
    import { tokenPrices } from '../data/app-store.js';
    import { shipTrades } from '../data/app-store.js';

    
    const saveNewColumnOrder = (event, data) => {
        console.log('saveNewColumnOrder EVENT', event);
        console.log('saveNewColumnOrder DATA', data);
    };

    const dummyObject = {};
    let width;
    let height;
    let composeColumns = () => [];
    let sortData = {};

    $: conversion = $tokenPrices['ATLAS/USDC'] || 0;

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

    const columns = [
        { dataName: 'image',display: ' ', 
            width:  64, noSort: () => true, cellComponent: CellImage },

        { dataName: 'name', display: 'Ship', 
            width: 190, cellComponent: CellHighlight },

        { dataName: 'askATLAS', display: 'Ask -Bid Atlas', 
            width: 200, displayText: ' ', currency: 'atlas', cellComponent: CellAskBid, headerComponent: TableHeaderATLAS, child: true },

        { dataName: 'askUSDC', display: 'Ask-Bid USDC', displayText: ' ', 
            width: 134, currency: 'usdc', cellComponent: CellAskBid, headerComponent: TableHeaderUSDC, child: true },

        { dataName: 'vwap', display: 'Retail (VWAP)', displayText: 'Retail',
            width: 104, alignRight: true, cellComponent: CellUSDC },

        { dataName: 'diff', display: 'USDC - Ask vs. Retail', displayText: 'Ask vs Retail', 
            width: 84, doubleLine:true, usePercent: true },

        { dataName: 'aprAskUSDC', display: 'APR vs Ask (USDC)', displayText: 'APR Ask',
            width: 92, capitalize: true, usePercent: true },

        { dataName: 'aprVWAP', display: 'APR vs Retail (VWAP)', displayText: 'APR Retail',
            width: 104, capitalize: true, usePercent: true },

        { dataName: 'spec', display: 'Role',
            width: 110, capitalize: true },

        { dataName: 'shipClass', display: 'Size',
            width: 100, capitalize: true },

        { dataName: 'rarity', display: 'Rarity',
            width: 100, capitalize: true },

        { dataName: 'supply', display: 'Total Supply',
            width: 86, doubleLine:true, alignRight: true, capitalize: true, cellComponent: CellATLAS }
    ];

    for (const column of columns) {
        sortData[column.dataName] = '';
    };

    const composeComposeColumns = (() => {
        let priorColumns = [];

        return (width, sortData) => {
            if (!width) { 
                return []; 
            }
            priorColumns = columns.map(column => ({
                ...column,
                headerComponent: column.headerComponent || TableHeader,
                cellComponent: column.cellComponent || CellBasic,
                clickHandler: composeClickHandler(column.dataName),
                sortDirection: sortData[column.dataName]
            }));

            return priorColumns;
        };
    });

    const composeShipData = (() => {

        return (ships, columns, sortData, tokenPrices) => {
            const rows = [];

            for (const ship of ships) {
                const { airdrops, id, image, name, attributes, symbol, primarySales, prices, tradeSettings } = ship;
                const { askATLAS, askUSDC, bidATLAS, bidUSDC } = prices || dummyObject;
                const { rarity, spec, class: shipClass } = attributes;
                const { vwap } = tradeSettings;

                const diff = !askUSDC ? 0 : (Number(askUSDC) - vwap)/vwap;      

                const askAtlasEq = Number(askATLAS) * conversion;
                const bidAtlasEq = Number(bidATLAS) * conversion;

                let supply = 0;
                for (const drop of airdrops) {
                    supply += drop.supply;
                }
                for (const sale of primarySales) {
                    supply += sale.supply;
                }

                rows.push({
                    id,
                    image,
                    name, 
                    symbol, 
                    askATLAS,
                    askAtlasEq,
                    bidATLAS,
                    bidAtlasEq,
                    askUSDC, 
                    bidUSDC, 
                    vwap, 
                    diff,
                    aprVWAP: calc.apr('VWAP', ship, tokenPrices),
                    aprAskUSDC: calc.apr('askUSDC', ship, tokenPrices),
                    spec: spec.toLowerCase(), 
                    shipClass: shipClass.toLowerCase(), 
                    supply,
                    rarity: rarity.toLowerCase()
                });
            }

            for (const sortField of Object.keys(sortData)) {
                if (sortData[sortField] === DESCEND) {
                    rows.sort(sortBy(sortField, CUSTOM_SORTS[sortField])).reverse();
                } else if (sortData[sortField] === ASCEND) {
                    rows.sort(sortBy(sortField, CUSTOM_SORTS[sortField]));
                }
            }

            return rows;
        };
    })(); 

    $: gridColumns = composeColumns(width, sortData);
    $: gridData = composeShipData($ships, gridColumns, sortData, $tokenPrices);
    // $: { 
    //     console.log('gridColumns', gridColumns);
    //     console.log('gridData', gridData);
    //     console.log('width', width, '   height', height);
    //    }

    onMount(() => {
        composeColumns = composeComposeColumns();
    });

</script>

<div class="grid-frame">
    <div class="grid-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
        <DataGrid 
            headerHeight={44}
            rowHeight={52}
            rows={gridData} 
            columns={gridColumns} 
            fixColumn={1}
            allowColumnReordering={false} 
            on:columnOrderUpdated={saveNewColumnOrder} />
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
        height: 1040px;
    }

</style>
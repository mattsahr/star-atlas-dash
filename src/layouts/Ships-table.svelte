<script>
    import { onMount } from 'svelte';
    import { ASCEND, DESCEND } from '../util/constants.js';
    import DataGrid from '../lib/svelte-data-grid/svelte-data-grid.svelte';
    import TableHeader from '../table/Table-header.svelte';
    import TableHeaderUSDC from '../table/Table-header-usdc.svelte';
    import TableHeaderATLAS from '../table/Table-header-atlas.svelte';
    import CellATLAS from '../table/Cell-atlas.svelte';
    import CellBasic from '../table/Cell-basic.svelte';
    import CellHighlight from '../table/Cell-highlight.svelte';
    import CellImage from '../table/Cell-image.svelte';
    import CellUSDC from '../table/Cell-usdc.svelte';
    import { sortBy } from '../util/helpers.js';
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
        { dataName: 'image',       index: 10,  display: ' ',                priority: 100, width:  64, noSort: () => true, cellComponent: CellImage },
        { dataName: 'name',        index: 20,  display: 'Ship',             priority: 100, width: 190,                     cellComponent: CellHighlight },
        { dataName: 'bidATLAS',    index: 30,  display: 'Bid Atlas',        priority: 100, width:  96, displayText: 'Bid', parent: true, cellComponent: CellATLAS, headerComponent: TableHeaderATLAS },
        { dataName: 'bidAtlasEq',  index: 30,  display: 'Bid Atlas (USDC)', priority: 100, width:  96, noSort: () => true, displayText: ' ', child: true, cellComponent: CellUSDC, },
        { dataName: 'askATLAS',    index: 40,  display: 'Ask Atlas',        priority: 100, width:  96, displayText: 'Ask', parent: true, cellComponent: CellATLAS, headerComponent: TableHeaderATLAS },
        { dataName: 'askAtlasEq',  index: 30,  display: 'Ask Atlas (USDC)', priority: 100, width:  96, noSort: () => true, displayText: ' ', child: true, cellComponent: CellUSDC, },
        { dataName: 'bidUSDC',     index: 50,  display: 'Bid USDC',         priority: 100, width: 116, displayText: 'Bid', cellComponent: CellUSDC, headerComponent: TableHeaderUSDC },
        { dataName: 'askUSDC',     index: 60,  display: 'Ask USDC',         priority: 100, width: 116, displayText: 'Ask', cellComponent: CellUSDC, headerComponent: TableHeaderUSDC },
        { dataName: 'vwap',        index: 70,  display: 'Retail (VWAP)',    priority: 100, width: 120, displayText: 'Retail', cellComponent: CellUSDC, headerComponent: TableHeaderUSDC },
        { dataName: 'diff',        index: 80,  display: 'USDC - Ask vs. Retail',   priority: 100, width: 94, displayText: 'Premium', usePercent: true },
        { dataName: 'symbol',      index: 90,  display: 'Symbol',           priority: 100, width: 90 },
        { dataName: 'spec',        index: 100, display: 'Role',             priority: 100, width: 110, capitalize: true },
        { dataName: 'shipClass',   index: 100, display: 'Size',             priority: 100, width: 120, capitalize: true },
        { dataName: 'rarity',      index: 110, display: 'Rarity',           priority: 100, width: 110, capitalize: true },
        { dataName: 'supply',      index: 110, display: 'Total Supply',     priority: 100, width: 110, capitalize: true, cellComponent: CellATLAS }
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

        return (ships, columns, sortData) => {
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
    $: gridData = composeShipData($ships, gridColumns, sortData);
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
            headerHeight={36}
            rowHeight={38}
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
        max-width: 1200px;
        height: 1040px;
    }

</style>
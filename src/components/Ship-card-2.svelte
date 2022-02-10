<script>
    import { bind } from 'svelte-simple-modal';
    import { modalStatus } from '../data/app-store.js';
    import { columnSettings } from '../data/data-helpers.js';
    import MetaTags from '../components/meta-tags-2.svelte';
    import FeatureShip from '../layouts/Feature-ship.svelte';
    import PriceAskBid from '../components/Price-ask-bid-2.svelte';
    import CellBasic from '../table/Cell-basic.svelte';

    export let ship;
    const columnDiff = columnSettings.find(column => column.dataName === 'diff');
    const columnAprAsk = columnSettings.find(column => column.dataName === 'aprAskUSDC');
    const columnAprRetail = columnSettings.find(column => column.dataName === 'aprVWAP');

    const clickHandler = () => {
        modalStatus.set(bind(FeatureShip, { message: ship.id }));
    };

</script>

<li class="ship-data">
    <div class="header-bar">
        <div class="ship-name" on:click={clickHandler}>
            {ship.name}
        </div>
        <MetaTags ship={ship} style="margin-top: -6px;" />
    </div>
    <div class="card-body">
        <div class="ship-image" on:click={clickHandler} 
            style={'background-image: url("' + ship.imageURL + '");'}></div>
        <PriceAskBid ship={ship} priceClass="right-column" />
    </div>
    <div class="card-footer">
        <div class="footer-row">
            <CellBasic column={columnAprAsk} row={{data: ship}} customClass="ship-card narrow" />
            <CellBasic column={columnAprRetail} row={{data: ship}} customClass="ship-card narrow" />
            <CellBasic column={columnDiff} row={{data: ship}} customClass="ship-card" />
        </div>
            <div class="footer-row">
            <div class="label diff narrow">APR Ask</div>
            <div class="label diff narrow">APR Retail</div>
            <div class="label diff">Ask vs Retail</div>
        </div>
    </div>
</li>


<style>

    .ship-data {
        list-style: none;
        padding: 0 12px 44px 12px;
        width: 320px;
    }

    .header-bar {
        display: flex;
        width: 100%;
        justify-content: space-between;
        border: solid rgb(160, 160, 160);
        border-width: 0 0 1px 0;
        padding: 0 0 4px 0;
    }

    .ship-name { 
        font-size: 18px; 
        font-weight: 600; 
        display: flex;
        cursor: pointer;
    }

    .ship-name:hover { 
        color: rgb(100, 130, 180);
    }


    .card-body {
        display: flex;
        width: 100%;
        justify-content: space-between;
        overflow: hidden;
    }


    .ship-image {
        width:  40%;
        height: 116px;
        background-size: cover;
        background-position: center;
        border-radius: 0;
        cursor: pointer;
        opacity: 1;
        transition: 300ms opacity;
        border: solid rgb(120, 120, 120);
        border-width: 0 0 0 1px;
    }

    .ship-image:hover {
        opacity: 0.9;
    }

    .card-footer {
        width: 100%;
        border: solid rgb(160, 160, 160);
        border-width: 0 0 1px 1px;
    }

    .footer-row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        overflow: hidden;
    }

    .card-footer .label {
        margin: 4px 0 0 0;
        text-transform: uppercase;
        color: rgb(170, 180, 180);
        font-size: 12px;
        line-height: 1;
        width:  38%;
        text-align: right;
        padding: 2px 0 6px 0;
    }

    .card-footer .label.narrow {
        width: 31%;
    }
  </style>
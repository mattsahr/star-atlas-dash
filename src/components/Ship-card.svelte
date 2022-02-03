<script>
    import { assets } from '../util/constants.js';
    import { bind } from 'svelte-simple-modal';
    import { modalStatus } from '../data/app-store.js';
    import FeatureShip from '../layouts/Feature-ship.svelte';
    import PriceAskBid from '../components/Price-ask-bid.svelte';
    import MetaTags from '../components/meta-tags.svelte';

    export let ship;

    const clickHandler = () => {
        modalStatus.set(bind(FeatureShip, { message: ship.id }));
    };

    $: imageName = ship.image ?  ship.image.split('/').pop() : '';
    $: imageURL = assets.images['thumb-220'][imageName] 
        ? ('images/thumb-220/' + imageName) 
        : ship.image;
    $: imageStyle = 'background-image: url("' + imageURL + '");';

    // div class="icon"><FaRocket /></div>

</script>

<li class="ship-data">
    <div class="header-bar">
        <div class="ship-name" on:click={clickHandler}>
            {ship.name}
        </div>
        <MetaTags ship={ship} style="margin-top: -6px;" />
    </div>
    {#if ship.prices}
        <div class="right-side">
            <div class="ship-image" on:click={clickHandler} style={imageStyle}></div>
            <PriceAskBid ship={ship} priceClass="right-column" />
        </div>
    {/if}
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
        border: solid #a0a0a0;
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

    /*  
    .ship-name .icon {
        position:  absolute;
        margin: -22px 0 0 -28px;
        color: rgba(0, 0, 0, 0);
        width: 16px;
        height: 16px;
        padding: 10px 10px 5px 5px;
        cursor: pointer;
        border: solid 1px transparent;
        border-radius: 16px;
    }

    .ship-name:hover .icon {
        color: rgb(210, 230, 255);
        border-color: rgb(210, 230, 255);
    }

    .right-column {
        width: 64%;
        margin-left: -4%;
    }

    */

    .right-side {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }


    .ship-image {
        width:  40%;
        height: 116px;
        background-size: cover;
        background-position: center;
        border-radius: 0 0 3px 5px;
        cursor: pointer;
        opacity: 1;
        transition: 300ms opacity;
    }

    .ship-image:hover {
        opacity: 0.9;
    }
  </style>
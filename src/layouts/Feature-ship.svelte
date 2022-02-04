<script>
    import { onMount } from 'svelte';
    import { gallery, ships } from '../data/app-store.js';
    import { assets } from '../util/constants.js';
    import FaExpand from 'svelte-icons/fa/FaExpand.svelte';
    import { getTrades } from '../data/fetch-market';
    import PriceAskBid from '../components/Price-ask-bid.svelte';
    import MetaTags from '../components/Meta-tags.svelte';
    import TradeChart from '../components/Trade-chart.svelte';
    import Vwap from '../components/Vwap.svelte';
    import Slots from '../components/Slots.svelte';

    const medium = assets.images['med-720'];
    export let message = 'Ship!';
    let w;

    const openGallery = () => {
        gallery.update(gal => ({ 
            ...gal, 
            ship
        }));
    };

    $: ship = $ships.find(next => next.id === message);
    $: imageName = ship.image ?  ship.image.split('/').pop() : '';
    $: imageURL = medium[imageName] ? ('images/med-720/' + imageName) : ship.image;
    $: imageStyle = 'background-image: url("' + imageURL + '");';
    $: atlasMarket = ship.markets.find(next => next.quotePair === 'ATLAS');
    $: marketURL = 'https://play.staratlas.com/market/' + atlasMarket.id;
    $: linkText = 'Official Star Atlas page for ' + ship.name;
    $: chartWidth = w - 48;
    $: chartHeight = Math.round(chartWidth / 1.6);
    // $: { console.log('Featured Ship', ship); }

    const resetGallery = () => {
        gallery.update(gal => ({ ...gal, currentIndex: 0}));
    };

    onMount(() => { 
        resetGallery();
        getTrades(ship); 
    }); 

</script>

{#if ship}
    <div class="feature-ship">
        <div class="image-box" on:click={openGallery}>
            <div class="image" style={imageStyle}>
                <div class="icon-message">
                    <div class="message">Gallery</div>
                    <div class="icon"><FaExpand /></div>
                </div>
            </div>
        </div>
        <div class="title-box">
            <div class="ship-title-box">
                <div class="ship-title-text">{ship.name}</div>
                <MetaTags ship={ship} includeSymbol={true} className="large" />
            </div>
        </div>
        <div class="content-box">
            <div class="content">

                <div bind:clientWidth={w} class="column-box-left">
                    <div class="ship-description">{ship.description}</div>
                    <TradeChart ship={ship} quotePair="USDC" 
                        width={chartWidth} height={chartHeight} />
                    <TradeChart ship={ship} quotePair="ATLAS" 
                        width={chartWidth} height={chartHeight} />
                </div>

                <div class="column-box-right">

                    <Vwap ship={ship} />

                    <div class="market-link">
                        <a title={linkText} href={marketURL}>
                            <span class="arrow">&raquo;</span> 
                            To Market Page
                            <span class="arrow">&raquo;</span> 
                        </a>
                    </div>

                    <div class="ship-price-box">
                        <PriceAskBid ship={ship} />
                    </div>

                    <div class="slots-wrapper">
                        <Slots slots={ship.slots.crewSlots} title="Crew" />
                        <Slots slots={ship.slots.componentSlots} title="Components" />
                        <Slots slots={ship.slots.moduleSlots} title="Modules" />
                    </div>
                </div>


            </div>
        </div>
    </div>
{:else}
    <p></p>
{/if}

<style>
    .feature-ship {
        /*background-color: rgb(255, 245, 230);*/
        padding: 40px 0 0 0;
    }


    .title-box,
    .image-box {
        width:  100%;
        display: flex;
        justify-content: center;
    }

    .ship-title-box {
        width:  100%;
        max-width: 720px;
        display:  flex;
        justify-content: space-between;
    }

    .ship-title-text {
        padding: 20px 0;
        font-size: 22px;
        font-weight: 700;
    }

    .image {
        position: relative;
        width:  100%;
        max-width: 720px;
        padding-bottom: 40%;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        border: solid 1px rgb(200, 190, 220);
        cursor: pointer;
    }

    .icon-message {
        display: flex;
        position: absolute;
        opacity: 0;
        transition: opacity 400ms;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        justify-content: flex-end;
        align-items: flex-end;
        background: rgb(0,0,0);
        background: linear-gradient(147deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.4) 100%);
        padding: 12px 22px 18px 0;
        color: rgb(230, 230, 230);
    }

    .icon-message .message {
        font-size: 15px;
        text-transform: uppercase;
        padding: 2px 12px 1px 0;
        line-height: 1;
    }

    .icon-message .icon {
        height: 19px;
        width: 19px;
    }

    .image:hover {
        border-color: rgb(0, 0, 0);
    }

    .image:hover .icon-message {
        opacity: 1;
    }

    .content-box {
        width:  100%;
        display: flex;
        justify-content: center;
    }

    .content {
        width:  100%;
        max-width: 720px;
        display: flex;
        justify-content: space-between;

    }

    .column-box-left {
        flex-grow: 2;
        width: 300px;
        padding: 0 32px 40px 0;
    }

    .ship-description {
        width: 100%;
        padding: 0 0 20px 0;
    }

    .column-box-right {
        border-radius: 3px;
        display: flex;
        justify-content: right;
        flex-wrap: wrap;
        max-width: 282px;
    }

    .ship-price-box {
        border: solid 1px rgb(200, 200, 200);
        border-radius: 2px;
        padding: 10px;
        width:  280px;
        height: 116px;
    }

    .market-link {
        width: 100%;
        text-align: right;
        margin: 16px 22px 6px 0;
    }

    .market-link a {
        text-decoration: none;
        font-weight: 700;
        font-size:  13px;
        color: rgb(20, 170, 230);
        cursor: pointer;
        text-transform: uppercase;
    }

    .market-link a .arrow {
        font-size:  18px;
    }

    .market-link a:hover {
        color: rgb(20, 220, 240);
    }

    .slots-wrapper {
        width:100%;
        margin: 10px 0 0 0;
    }



</style>
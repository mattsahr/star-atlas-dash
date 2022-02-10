<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { sineOut } from 'svelte/easing';
    import WZoom from './wzoom/wheel-zoom';
    import { getDocHeight, getDocWidth } from '../util/dom.js';

    import IconMagnify from '../components/icons/IconMagnify.svelte';
    import IconDeMagnify from '../components/icons/IconDeMagnify.svelte';
    import IconChevronLeft from '../components/icons/IconChevronLeft.svelte';
    import IconChevronRight from '../components/icons/IconChevronRight.svelte';
    import IconX from '../components/icons/IconX.svelte';

    import KeyCapture from '../components/Key-capture.svelte';
    import { gallery } from  '../data/app-store';

    const dummyArray = [];

    let loaded = false;
    let slideDirection = '';
    let imgEl;
    let zoomer;
    let arrived = true;

    let foundWidth = 0;
    let foundHeight = 0;

    const composeImageURL = (() => {
        const prefix = 'https://play.staratlas.com/_next/image?url=';
        const suffix = '&w=1920&q=75';
        return address => prefix + encodeURIComponent(address) + suffix;
    })();

    const updateGallery = (field, value) => {
        gallery.update(gal => ({...gal, [field]: value }));
    };

    const closeLightbox = () => {
        updateGallery('ship', null);
    };

    const closeMe = () => { 
        slideDirection = '';
        loaded = false;
        // showFullDescription = true;
        // scale = 1;
        if (zoomer) { 
            zoomer.destroy(); 
            zoomer = null;
        }
        closeLightbox(); 
    };

    const onImageLoad = () => {

        const getZoomer = () => zoomer;

        const setLoaded = (newLoaded) => { loaded = newLoaded; };
        const setZoomer =(newZoomer) => zoomer = newZoomer;

        const setHeight = newHeight => { foundHeight = newHeight; };
        const setWidth = newWidth => { foundWidth = newWidth; };

        return function () {

            const zoomer = getZoomer();

            setHeight(this.height);
            setWidth(this.width);
            setLoaded(true);

            if (!zoomer) {
                const zoomProps = {
                    minScale: 1,
                    maxScale: 5,
                    speed: 6,
                    dragScrollableOptions: {
                        smoothExtinction: true
                    },
                    zoomOnClick: false
                };

                setZoomer(WZoom.create(imgEl, zoomProps));
            }
        };
    };

    const composeScale = (height, width) => {
        const ratio = height / width;
        if (ratio > 1) {
            return 'width:' + (getDocHeight() / ratio).toFixed(1) + 'px; ' +
                'height:' + getDocHeight() + 'px;';
        }
        return 'width:' + getDocWidth() + 'px; ' +
            'height:' + (getDocWidth() * ratio).toFixed(1) + 'px;';
    };

    const calcHeight = (width, height) => {
        const ratio = height / width;
        if (ratio > 1) {
            return getDocHeight() + 'px';
        }
        return (getDocWidth() * ratio).toFixed(1) + 'px';
    };

    const calcWidth = data => {
        const { width, height } = data;
        const ratio = height / width;
        if (ratio > 1) {
            return (getDocHeight() / ratio).toFixed(1) + 'px';
        }
        return getDocWidth() + 'px';
    };

    $: ship = $gallery.ship;
    $: active = Boolean(ship);
    $: imageList = active ? [ ship.image, ...ship.media.gallery ] : dummyArray;
    $: currentIndex = $gallery.currentIndex || 0;
    $: source = active ? imageList[currentIndex] : '';
    $: fileName = source ? source.split('/').pop() : '';
    $: src = source ? composeImageURL(source) : '';

    $: width = foundWidth || 1920;
    $: height = foundHeight || 1200;

    $: ratio = height / width;
    $: workingHeight = calcHeight(width, height);
    $: workingWidth = calcWidth(width, height);
    $: photoClass = 'photo ' + (ratio > 1 ? 'tall' : ratio < 1 ? 'wide' : 'square');
    $: alt = fileName || 'image';
    $: lightboxClass = 'lightbox' + (active ? ' active': '');
    $: photoSvgClass = 'photo-svg' + (loaded ? ' image-loaded': '');
    $: photoScale = composeScale(height, width);

    /*
    $: {
        console.groupCollapsed('shipId', (ship && ship.symbol), (ship && ship.id), 
            '  IMG ' + currentIndex + '   width ' + width + '   height' + height
        );
        console.log('SRC ' + src);
        console.log('lightbox', imageList);
        console.log('fileName', fileName);
        console.groupEnd();
    }
    */

    const reset = () => {
        loaded = false;
    };

    const zoomIn = () => {
        if (zoomer) { zoomer.zoomUp(); }
    };

    const zoomOut = () => {
        if (zoomer) { zoomer.zoomDown(); }
    };

    function slideOut(node, { delay = 0, duration = 150 }) {
        return {
            delay,
            duration,
            css: t => {
                if (!slideDirection) { return ''; }
                const direction = slideDirection === 'forward' ? 1 : -1;
                const eased = sineOut(t);
                return `transform: translate(${direction *(-105 + (eased * 105))}%, 0)`;
            }
        };
    }

    function slideIn(node, { delay = 0, duration = 350 }) {
        return {
            delay,
            duration,
            css: t => {
                if (!slideDirection) { return ''; }
                const direction = slideDirection === 'forward' ? 1 : -1;
                const eased = sineOut(t);
                return `transform: translate(${direction * (105 - (eased * 105))}%, 0)`;
            }
        };
    }

    const showNext = () => {
        slideDirection = 'forward';

        if (zoomer) {
            zoomer.destroy();
            zoomer = null;
        }

        arrived = false;
        const nextIndex = (currentIndex === imageList.length - 1) ? 0 : (currentIndex + 1);
        setTimeout(() => {
            loaded = false;
            updateGallery('currentIndex', nextIndex);
            setTimeout(() => { if(zoomer) { zoomer.prepare(); } arrived = true;  }, 400);
        }, 140);


    };

    const showPrior = () => {
        slideDirection = 'previous';

        if (zoomer) {
            zoomer.destroy();
            zoomer  = null;
        }

        arrived = false;
        const priorIndex = currentIndex === 0 ? (imageList.length - 1) : (currentIndex - 1);

        setTimeout(() => {
            loaded = false;
            updateGallery('currentIndex', priorIndex);
            setTimeout(() => { if(zoomer) { zoomer.prepare(); } arrived = true; }, 400);
        }, 140);

    };

    onMount(reset);

</script>

<!-- ====================================== HTML =============================================== -->


{#if active}
<div class={lightboxClass} in:fade out:fade>

    <div class="icon-button magnify" on:click={zoomIn}><IconMagnify /></div>
    <div class="icon-button de-magnify" on:click={zoomOut}><IconDeMagnify /></div>
    <div class="icon-button close-me" on:click={closeMe}><IconX /></div>

    <div class="prior" on:click={showPrior}><IconChevronLeft /></div>
    <div class="next" on:click={showNext}><IconChevronRight /></div>

    {#if arrived}
    <div class="photo-frame" in:slideIn out:slideOut>
        <div class="photo" style={photoScale}>
            <img on:load={onImageLoad()} {src} bind:this={imgEl} {alt} />
        </div>
    </div>
    {/if}

    {#each imageList as imageSource }
        <div in:fade out:fade class="description-panel collapsed">
            <div class="description-column">
                <a class="download-button" 
                    href={composeImageURL(imageSource)} download={imageSource.split('/').pop()} >
                    Download
                    <IconChevronRight />
                </a>
            </div>
        </div>
    {/each}
</div>
<KeyCapture onEscape={closeMe} />
{/if}


<!-- ====================================== STYLES ============================================= -->
<style>
    .lightbox {
        position: fixed;
        z-index: 1020;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.95);
    }

    .photo-frame {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .photo {
        margin: auto;
        position: absolute;
    }

    .photo img {
        display: block;
        user-select: none;
        width: 100%;
    }

    .photo.wide img {
        width: 100%;
        height: auto;
    }

    .photo.tall img {
        width: auto;
        height: 100%;   
    }

    .photo.tall img,
    .photo.square img {
        width: auto;
        height: 100%;   
    }

    .photo-svg {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 20;
        transition: opacity 2000ms;
        pointer-events: none;
        overflow: hidden;
    }

    .icon-button {
        position: absolute;
        width: 40px;
        height: 40px;
        background-color: rgba(20, 20, 20, 0.7);
        border-radius: 4px;
        cursor: pointer;
        z-index: 20;
        transition: opacity 250ms;
        opacity: 0.5;
    }

    .icon-button:hover {
        opacity: 1;
    }

    .magnify {
        top: 20px;
        right: 180px;
    }

    .de-magnify {
        top: 20px;
        right: 120px;
    }

    .close-me {
        top: 20px;
        right: 30px;
    }

    .prior {
        position: absolute;
        top: 80px;
        display: flex;
        align-items: center;
        left: 0;
        bottom: 80px;
        padding: 0 20px 0 20px;
        opacity: 0.7;
        border-radius: 0 20px 20px 0;
        background-color: rgba(0, 0, 0, 0);
        transition: background-color 400ms;
        z-index: 40;
        cursor: pointer;
    }

    .next {
        position: absolute;
        top: 80px;
        display: flex;
        align-items: center;
        right: 0;
        bottom: 80px;
        padding: 0 20px 0 20px;
        opacity: 0.7;
        border-radius: 20px 0 0 20px;
        background-color: rgba(0, 0, 0, 0);
        transition: background-color 400ms;
        z-index: 40;
        cursor: pointer;
    }

    .prior:hover,
    .next:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .description-panel {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        min-height: 120px;
        background-color: rgba(0, 0, 0, 0.7);
        transition: height 400ms, min-height 400ms;
    }

    .description-panel.collapsed {
        overflow: hidden;
        height: 40px;
        min-height: 40px;
    }

    .description-column {
        position: relative;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        padding: 34px 60px 28px 60px;
        color: rgb(220, 220, 220);
        font-size: 13px;
    }

    .description-expand-toggle {
        position: absolute;
        top: 0;
        right: 100px;
        width: 40px;
        height: 30px;
        cursor: pointer;
        opacity: 0.4;
    }

    .description-expand-toggle:hover {
        opacity: 1;
    }

    .description-expand-toggle :global(svg) {
        transform: rotate(90deg) scale(0.5) translate(-20px, 0);
    }

    .description {
        margin: 0 0 20px 0;
    }

    .download-button {
        text-decoration: none;
        color: rgb(150, 210, 255);
        font-weight: bold;
        padding: 10px 20px 10px 20px;
        margin: 0 0 0 -20px;
        border-radius: 3px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        position: relative;
        display: block;
        width: 114px;        
    }

    .download-button:hover {
        background-color: rgb(10, 30, 50);
        color: rgb(255 255 255);
    }

    .download-button :global(svg) {
        display: block;
        top: -9px;
        right: 14px;
        position: absolute;
        transform: rotate(90deg) scale(0.3);
    }


</style>
<script>
    import { onMount } from 'svelte';
    export let message;
    let width;

    const marketMap = {
        'ATLAS/USDC': 'FTX:ATLASUSD',
        'POLIS/USDC': 'FTX:POLISUSD',
        'SOL/USDC': 'FTX:SOLUSD'
    };

    const onLoad = () => {

        console.log('MARKET>>> ???', message, marketMap[message]);

        const height = Math.max(Math.round(width/1.6, 500));

        new window.TradingView.widget({
            width: Math.round(width/1.1),
            height,
            symbol: marketMap[message], // 'FTX:ATLASUSD',
            interval: '60',
            timezone: 'Etc/UTC',
            theme: 'light', // 'dark',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            save_image: false,
            // show_popup_button: true,
            popup_width: '1000',
            popup_height: '650',
            container_id: 'tradingview-target'
        });
    };

    const tradingViewJS = 'https://s3.tradingview.com/tv.js'; // 'jslib/tradingview.js';

    const loadScript = function (src, callback) {
        var fileRequest = document.createElement('script');
        fileRequest.setAttribute('async', true);
        fileRequest.setAttribute('type', "text/javascript");
        fileRequest.setAttribute('src', src);
        fileRequest.onload = callback;
        document.getElementsByTagName("head")[0].appendChild(fileRequest);
    };

    const mounted = () => loadScript(tradingViewJS, onLoad);

    onMount(mounted); 


</script>

<div class="chart-container" bind:clientWidth={width}>
    <div id="tradingview-target"></div>
</div>

<style>
    .chart-container {
        width: 100%;
        display:  flex;
        justify-content: center;
        padding: 36px 0 20px 0;
    }
</style>
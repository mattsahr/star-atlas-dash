<script>
    import { RESPONSIVE } from '../util/constants.js';
    import Ticker from '../components/Ticker.svelte';
    import ButtonDisplayMode from '../components/Button-display-mode.svelte';

    export let switchDisplayMode = () => false;
    export let displayMode;
    export let showModeSwitch;
</script>

<header>
    <Ticker />
    <div class="header-frame">
        <div class="header-column">
            <h1>Ship Markets</h1>
            {#if showModeSwitch}
                <ButtonDisplayMode 
                    displayMode={displayMode} switchDisplayMode={switchDisplayMode} />
            {/if}
        </div>
    </div>
</header>

<style>
    header {
        box-sizing: border-box;
    }

    .header-frame {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 24px 0 24px;
        height: 80px;
    }

    .header-column {
        width: 100%;
        max-width: 1390px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    h1 {
        text-transform: uppercase;
        font-size: 32px;
        font-weight: 100;
        padding: 0;
        margin: 0;
    }

</style>
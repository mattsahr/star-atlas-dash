<script>
    import Ticker from '../components/Ticker.svelte';
    import ButtonDisplayMode from '../components/Button-display-mode.svelte';

    export let switchDisplayMode = () => false;
    export let displayMode;
</script>

<header>
    <Ticker />
    <div class="header-frame">
        <div class="header-column">
            <h1>Star Atlas ships</h1>
            <ButtonDisplayMode displayMode={displayMode} switchDisplayMode={switchDisplayMode} />
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
        padding: 0 24px 24px 24px;
        height: 120px;
    }

    .header-column {
        width: 100%;
        max-width: 1200px;
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
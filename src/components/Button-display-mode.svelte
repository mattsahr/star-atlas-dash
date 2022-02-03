<script>
    export let switchDisplayMode = () => false;
    export let displayMode;

    $: tableClass = 'mode table' + (displayMode === 'table' ? ' active' : '');
    $: gridClass = 'mode grid' + (displayMode === 'grid' ? ' active' : '');
</script>


<div class="button-display-mode">
    <div on:click={switchDisplayMode('table')} class={tableClass}>Table</div>
    <div on:click={switchDisplayMode('grid')} class={gridClass}>Grid</div>
</div>

<style>
        .button-display-mode {
        border: solid 1px rgb(200, 200, 200);
        border-radius: 2px;
        font-size: 14px;
        line-height: 1.4;
        text-transform: capitalize;
        width: 140px;
        display: flex;
        justify-content: center;
    }


    .mode {
        padding: 6px 16px;
        width: 50%;
        color: rgb(100, 100, 100);
        cursor: pointer;
    }

    .mode:hover {
        background-color: rgb(240, 240, 240);
        border-color: rgb(150, 150, 150);
        cursor: pointer;
    }

    .mode.table {
        border: solid rgb(200, 200, 200);
        border-width: 0 1px 0 0;
    }

    .mode.active {
        background: rgb(230, 242, 245);
        font-weight: 700;
        color: rgb(40, 40, 40);
        cursor: default;
    }

    .mode.active:hover {
        background-color: rgb(230, 240, 250);
        cursor: default;
    }
</style>
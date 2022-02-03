<script>
    import ShipCard from '../components/Ship-card.svelte';
    import { ships } from '../data/app-store.js';
    export let contained;
</script>

{#if contained}
<ul class="list-grid">
    {#each $ships as ship (ship.id)}
        <ShipCard ship={ship} />
    {/each}
</ul>
{:else}
<div class="grid-frame">
    <div class="grid-column">
        <ul class="list-grid">
            {#each $ships as ship (ship.id)}
                <ShipCard ship={ship} />
            {/each}
        </ul>
    </div>
</div>
{/if}


<style>
    .grid-frame {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 24px;
    }

    .grid-column {
        width: 100%;
        max-width: 1390px;
    }

    .list-grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 0;
        padding: 0;
    }
</style>
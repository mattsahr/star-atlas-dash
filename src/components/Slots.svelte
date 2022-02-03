<script>
    export let slots;
    export let title;
</script>

<div class="grid-wrapper">

    <div class="row header">
        <div class="column type">{title}</div>    
        <div class="column size">{title === 'Crew' ? '' : 'Size'}</div>    
        <div class="column count">#</div>    
    </div>

    {#each slots as slot, i}
        <div class={i % 2 ? 'row' : 'row odd'}>
            <div class="column type">{slot.type}</div>    
            <div class="column size">{title === 'Crew' ? '' : slot.size}</div>    
            <div class="column count">{slot.quantity}</div>    
        </div>
    {/each}

</div>

<style>

    .grid-wrapper {
        padding: 10px 0 20px 0;
        width:100%;
    }

    .row {
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        line-height: 1;
        padding: 4px 20px 6px 8px;
        border-radius: 2px;
    }

    .row.odd {
        background-color: rgb(240, 241, 242);
    }

    .row.header {
        font-weight: 700;
    }

    .row.header .column.type {
        font-size: 16px;
        font-weight: 700;
    }

    .column { text-align: left; padding: 2px 6px; }
    .column.type { width: 64% }
    .column.size { width: 30% }
    .column.count { width: 5%; text-align: center; }
</style>
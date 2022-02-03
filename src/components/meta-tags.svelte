<script>
    export let includeSymbol = false;
    export let style = '';
    export let className = '';
    export let ship;

    $: metaClass = 'ship-meta' + (className ? ' ' + className : '');
</script>

{#if ship}
    <div class={metaClass} style={style}>
        <span class="capitalize">{ship.attributes.spec}</span>
        <span class="subtitle">{ship.attributes.class}</span>
        {#if includeSymbol}<span class="ship-symbol">Symbol: {ship.symbol}</span>{/if}
    </div>
{/if}

<style>

    .capitalize {
        text-transform: capitalize;
    }

    .ship-meta span {
        display:  block;
        text-align:  right;
        font-size: 13px;
        line-height: 15px;
    }

    .ship-meta span.subtitle {
        font-size: 9px;
        opacity: 0.5;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .ship-meta span.ship-symbol {
        font-size: 9px;
        opacity: 0.5;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .ship-meta.large {
        margin: 12px 0 0 0;
    }

    .ship-meta.large span {
        font-size:  15px;
    }

    .ship-meta.large span.subtitle,
    .ship-meta.large span.ship-symbol {
        font-size:  11px;
    }
</style>
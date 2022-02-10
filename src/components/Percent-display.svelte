<script>
    export let num = 0;
    export let decimals = 1;
    export let style = '';
    export let className = '';

    $: workingClass = className ? className + ' ' : '';
    $: percentClass = num < 0 ? 'percent-display negative' : 'percent-display positive';
    $: sign = num === 0 ? '' : num < 0 ? '—' : '+';
    $: displayNum = Math.abs(num * 100).toFixed(decimals);
</script>

<div class={workingClass + percentClass} style={style}>
    <span class="sign">{sign}</span>
    <span class="number">{displayNum}</span>
    <span class="percent-mark">%</span>
</div>


<style>

    .percent-display {
        display: flex;
        font-size: 16px;
        line-height: 16px;
        justify-content: flex-end;
        align-items: flex-start;
    }

    .percent-display.table {
        height: 52px;
        padding: 18px 6px 0 0;
        font-size: 13px;
        line-height: 15px;
    }

    .percent-display.simple-table {
        height: 52px;
        padding: 18px 6px 0 0;
        font-size: 13px;
        line-height: 15px;
    }

    .percent-display.ship-card.table,
    .percent-display.ship-card.simple-table {
        height: 14px;
        padding: 2px 0 0 0;
    }

    .percent-display.ticker {
        height: 14px;
        padding: 1px 0 0 0;
        font-size: 12px;
        line-height: 13px;
    }


    .percent-display span {
        display: block;
    }

    .positive {
        color: rgb(0, 170, 80);
    }

    .negative {
        color: rgb(220, 20, 0);
    }

    .simple-table.positive,
    .simple-table.negative {
        color: rgb(80, 80, 80);
    }

    .positive .sign {
        font-size: 1.3em;
        margin: -0.08em 0.15em 0 0
    }

    .negative .sign {
        font-size: 0.8em;
        margin: -0.04em 0.2em 0 0;
        font-weight: 700;
    }

    .simple-table .sign {
        display: none;
    }

    .number {
        letter-spacing: 0.05em;
    }

    .percent-mark {
        margin: 0.01em 0 0 0.15em;
        font-size: 0.9em;
    }

    .positive .percent-mark {
        margin: -0.1em 0 0 0.15em;
        font-size: 0.9em;
    }

</style>
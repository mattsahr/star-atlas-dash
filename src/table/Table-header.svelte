<script>
    import { ASCEND, DESCEND } from '../util/constants.js';
    import FaSortUp from 'svelte-icons/fa/FaSortUp.svelte';
    import FaSortDown from 'svelte-icons/fa/FaSortDown.svelte';
    import FaSort from 'svelte-icons/fa/FaSort.svelte';

    export let column;

    $: headerClass = 'table-header' + 
        (column.sortDirection === ASCEND ? ' ascend' : '') +
        (column.sortDirection === DESCEND ? ' descend' : '') +
        (column.doubleLine ? ' double-line' : '') +
        (column.alignRight ? ' align-right' : '');

</script>

<div on:click={column.noSort || column.clickHandler} class={headerClass}>
    {column.displayText || column.display}
    {#if column.sortDirection === ASCEND }
        <div class="sort-icon"><FaSortDown /></div>
    {:else if column.sortDirection === DESCEND}
        <div class="sort-icon descend"><FaSortUp /></div>
    {:else if !column.noSort}
        <div class="sort-icon dormant"><FaSort /></div>
    {/if}
</div>

<style>
    .table-header {
        height: 36px;
        text-align: left;
        padding: 0 0 0 14px;
        font-size: 14px;
        font-weight: 700;
        background-color: #faf9f8;
        line-height: 44px;
    }

    .table-header.double-line {
        line-height: 16px;
        margin-top: -1px;
    }

    .table-header.align-right {
        text-align: right;
        padding-right: 24px;
    }


    .sort-icon {
        position: absolute;
        right: 3px;
        width: 22px;
        height: 22px;
        color: rgb(250, 160, 0);
        top: 2px;
    }    
    .sort-icon.descend {
        top: 12px;
    }

    .sort-icon.dormant {
        color: rgb(230, 230, 230);
        opacity: 0;
        top: 6px;
    }

    .table-header:hover .sort-icon.dormant {
        opacity: 1;
    }


</style>
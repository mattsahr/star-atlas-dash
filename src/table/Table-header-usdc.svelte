<script>
    import { ASCEND, DESCEND } from '../util/constants.js';
    import Icon from '../components/Icon.svelte';
    import FaSortUp from 'svelte-icons/fa/FaSortUp.svelte';
    import FaSortDown from 'svelte-icons/fa/FaSortDown.svelte';
    import FaSort from 'svelte-icons/fa/FaSort.svelte';

    export let column;

    const iconStyle = 'margin: 8px 6px 0 0; opacity: 0.4;';

    $: headerClass = 'table-header-usdc' + 
        (column.sortDirection === ASCEND ? ' ascend' : '') +
        (column.sortDirection === DESCEND ? ' descend' : '');

</script>

<div on:click={column.clickHandler} class={headerClass} title={column.display || ''}>
    <Icon name="usdc" style={iconStyle} width="18px" height="18px" />
    <div clas="text">{column.displayText}</div>
    {#if column.sortDirection === ASCEND }
        <div class="sort-icon"><FaSortDown /></div>
    {:else if column.sortDirection === DESCEND}
        <div class="sort-icon descend"><FaSortUp /></div>
    {:else}
        <div class="sort-icon dormant"><FaSort /></div>
    {/if}
</div>

<style>
    .table-header-usdc {
        height: 36px;
        text-align: left;
        padding: 0 28px 0 0;
        font-size: 14px;
        font-weight: 700;
        display: flex;
        justify-content: flex-end;
        align-items: center;
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

    .table-header-usdc:hover .sort-icon.dormant {
        opacity: 1;
    }


</style>
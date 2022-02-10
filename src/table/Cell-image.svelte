<script>
    import { assets } from '../util/constants.js';
    import { bind } from 'svelte-simple-modal';
    import { modalStatus } from '../data/app-store.js';
    import FeatureShip from '../layouts/Feature-ship.svelte';

    export let column;
    export let rowNumber;
    export let row;

    const clickHandler = () => {
        modalStatus.set(bind(FeatureShip, { message: row.data.id }));
    };

    $: val = row.data[column.dataName];
    $: odd = Boolean(rowNumber % 2);
    $: cellClass = 'cell-image ' + 
        (odd ?  'odd' : 'even');

    $: imageName = val ? val.split('/').pop() : '';
    $: imageURL = assets.images['thumb-220'][imageName] 
        ? ('images/thumb-220/' + imageName) 
        : val;
    $: imageStyle = 'background-image: url("' + imageURL + '");';

</script>

<div class={cellClass} on:click={clickHandler}>
    <div class="image" style={imageStyle}></div>
</div>

<style>
    .cell-image {
        padding: 2px 0 0 2px;
        height: 52px;
        cursor: pointer;
    }

    .image {
        width: 62px;
        height: 46px;
        background-size: cover;
        background-position: center;
        border-radius: 2px;
    }

</style>
<script>
    import MdClose from 'svelte-icons/md/MdClose.svelte'
    export let onClose;
</script>

<div class="close-button" on:click={onClose}>
    <MdClose />
</div>

<style>
    .close-button {
        position: absolute;
        z-index: 199;
        top: 0;
        right: 20px;
        height: 40px;
        width: 40px;
        padding: 8px;
        border-radius: 24px;
        color: rgb(180, 180, 180);
        cursor: pointer;
        background-color: #faf9f8;
    }

    .close-button:hover {
        color: rgb(160, 160, 250);
        background-color: rgb(240, 245, 250);
    }
</style>
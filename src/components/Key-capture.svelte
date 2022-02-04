<script>
    import Keydown from "svelte-keydown";
    export let onEscape;
    export let log;

    const onEscapeMessage = (e) => {
        console.log('onEscape!', e);
        onEscape(e);
    };

</script>

{#if onEscape && log}
    <Keydown on:Escape={onEscapeMessage} />
{:else if onEscape}
    <Keydown on:Escape={onEscape} />
{/if}

<script>
    import { onMount } from 'svelte';
	import Modal from 'svelte-simple-modal';
    import Lightbox from './lightbox/Lightbox.svelte';
    import { modalStatus } from './data/app-store.js';
    import { fetchNFTs } from './data/fetch-sa.js';
    import HeaderBar from './layouts/Header-bar.svelte';
	import ModalCloseButton from './components/Modal-close-button.svelte';
	import ShipsGrid from './layouts/Ships-grid.svelte';
	// import ShipsTable from './layouts/Ships-table.svelte';
	import ShipsTable from './layouts/Ships-table-2.svelte';

	let displayMode = 'table'; // 'grid';

    onMount(fetchNFTs);	

    const switchDisplayMode = mode => () => {
    	if (mode) {
    		displayMode = mode;
    	} else {
	    	displayMode = displayMode === 'grid' ? 'table' : 'grid';
    	}
    };
</script>

<main class="svelte-app-main">
	<Modal show={$modalStatus}
		unstyled={true}
		classBg="modal-bg"
		classWindowWrap="modal-window-wrap"
		classWindow="modal-window"
		classContent="modal-content"
		classCloseButton="modal-close-button"
		closeButton={ModalCloseButton} >

			<HeaderBar displayMode={displayMode} switchDisplayMode={switchDisplayMode} />
			
			{#if displayMode === 'grid'}
				<ShipsGrid />
			{:else if displayMode === 'table'}
				<ShipsTable />
			{/if}
	</Modal>
	<Lightbox />
</main>

<style>
	main {}

</style>
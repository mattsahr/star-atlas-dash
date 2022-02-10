<script>
    import { onMount } from 'svelte';
	import Modal from 'svelte-simple-modal';
    import Lightbox from './lightbox/Lightbox.svelte';
    import { RESPONSIVE } from './util/constants.js';
    import { getDocWidth } from './util/dom.js';
    import { modalStatus } from './data/app-store.js';
    import { fetchNFTs } from './data/fetch-sa.js';
    import HeaderBar from './layouts/Header-bar.svelte';
	import ModalCloseButton from './components/Modal-close-button.svelte';
	import ShipsGrid from './layouts/Ships-grid.svelte';
	import ShipsTable from './layouts/Ships-table.svelte';

	const { MIN_WIDTH } = RESPONSIVE;
	let displayMode = (getDocWidth() < MIN_WIDTH) ? 'grid' : 'table';
	let showModeSwitch = false;
	let heightOffset = 0;


	const updateDisplayMode = () => {
		displayMode = (getDocWidth() < MIN_WIDTH) ? 'grid' : displayMode;
		showModeSwitch = (getDocWidth() < MIN_WIDTH) ? false : true;
	};

    onMount(() => {

		window.addEventListener('resizeend', updateDisplayMode);
		updateDisplayMode();
		fetchNFTs();

		const root = document.getElementById('star-atlas-dashboard');
		heightOffset = Number(root.getAttribute('data-height-offset') || 0);
    });	

    const switchDisplayMode = mode => () => {
    	if (mode) {
    		displayMode = (getDocWidth() < MIN_WIDTH) ? 'grid' : mode;
    	} else {
	    	displayMode = displayMode === 'grid' 
		    	? (getDocWidth() < MIN_WIDTH) ? 'grid' : 'table' 
		    	: 'grid';
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

			<HeaderBar 
				showModeSwitch={showModeSwitch}
				displayMode={displayMode} 
				switchDisplayMode={switchDisplayMode} />
			
			{#if displayMode === 'grid'}
				<ShipsGrid />
			{:else if displayMode === 'table'}
				<ShipsTable heightOffset={heightOffset} />
			{/if}
	</Modal>
	<Lightbox />
</main>

<style>
	main {}

</style>
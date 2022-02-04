import { /* derived, get, */writable } from 'svelte/store';

export const tokenPrices = writable({});
export const shipPrices = writable({});
export const shipTrades = writable({});
export const nfts = writable([]);
export const ships = writable([]);
export const modalStatus = writable(null);
export const gallery = writable({});

window.appState = {};

tokenPrices.subscribe(prices => { window.appState.tokenPrices = prices; });
shipPrices.subscribe(prices => { window.appState.pricesPrices = prices; });
shipTrades.subscribe(trades => { window.appState.shipTrades = trades; });
nfts.subscribe(nftList => { window.appState.nfts = nftList; });
ships.subscribe(shipList => { window.appState.ships = shipList; });
modalStatus.subscribe(status => { window.appState.modalStatus = status; });
gallery.subscribe(status => { window.appState.gallery = status; });

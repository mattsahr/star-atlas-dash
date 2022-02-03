import { nfts, shipPrices, ships } from './app-store.js';
import { getPrices } from './fetch-market.js';
import refData from './price-reference.json';
import { sortBy } from '../util/helpers.js';

let prices = {};
shipPrices.subscribe(priceMap => { prices = priceMap; });


export const fetchNFTs = async() => {
    const starAtlasURL = 'https://galaxy.staratlas.com/nfts';
    const results = await fetch(starAtlasURL);
    const nftList = await results.json();
    nfts.set(nftList);
};

export const getShips = (() => {

    return nftList => {

        if (!nftList) { return []; }

        const shipSubset = nftList.filter(next => 
            next.attributes && 
            next.attributes.itemType === 'ship' &&
            next.deactivated === false &&
            next.markets
        );

        if (!shipSubset || !shipSubset.length) {
            return;
        }

        const delivery = shipSubset
            .map(ship => ({ 
                ...refData[ship.symbol],
                ...ship, 
                prices: prices[ship.id]
            }))
            .sort(sortBy('name'));

        ships.set(delivery);

        setTimeout(getPrices, 50);
    };

})(); 

nfts.subscribe(getShips);


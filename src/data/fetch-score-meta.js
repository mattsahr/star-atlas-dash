import { getScoreVarsShipInfo } from "@staratlas/factory";
import { Connection, PublicKey /* Keypair */ } from "@solana/web3.js";
import { ships } from './app-store.js';

let shipList = [];
ships.subscribe(list => {shipList = list; });

/*
TODO -- I AM USING A DUMB HACK FOR NOW 
I OVERWRITE /node_modules/safe-buffer/ SO THAT ROLLUP WILL WORK WITH IT.

MANY DEPENDENCIES REQUIRE /node_modules/safe-buffer 
BUT IN THIS APP'S ROLLUP CONFIG -- I CAN'T FIGURE OUT HOW TO USE 
THE "require" DECLARATION INSIDE /safe-buffer/ SO I OVERWROTE IT

TO MAKE THIS WORK FOR YOUR INSTALL:
TAKE THE CONTENTS OF /node_modules/buffer-es6 
COPY THE FILES INTO /node_modules/safe-buffer ALLOWING OVERWRITES TO HAPPEN.

YES.  IT IS A RIDICULOUS HACK.
*/

export const NEED_API_KEY = 'YOU NEED AN API KEY FROM FIGMENT.IO';
export const FIGMENT_KEY  = '0fa79b2db1518fd6bd044232ed16f097';
//  PUT YOUR API KEY HERE   ^^  GET AN API KEY FROM FROM https://datahub.figment.io
const FIGMENT_URL = 'https://solana--mainnet.datahub.figment.io/apikey/' + FIGMENT_KEY;
export const FLEET_PROGRAM = new PublicKey("FLEET1qqzpexyaDpqb2DGsSzE2sDCizewCg9WjrA6DBW");
export const STAR_ATLAS_NFT_URL = 'https://galaxy.staratlas.com/nfts';
export const CONN = new Connection(FIGMENT_URL);


export const sleep = async function (ms) {
  return new Promise((resolve) =>setTimeout(resolve, ms));
};

export async function retryAsync(asyncFunc, count = 3) {
    let _count = count;
    while (_count > 0) {
        try {
            const result = await asyncFunc();
            return result;
        } catch (error) {
            console.log(error);
            _count -= 1;
            if (_count === 0) {
                throw error;
            } else {
                await sleep(110);
                continue;
            }
        }
    }
}

const getScoreInfo = async shipMint => {
    const mintKey = new PublicKey(shipMint);
    const shipInfo = await retryAsync(() => 
        getScoreVarsShipInfo(CONN, FLEET_PROGRAM, mintKey));
    return shipInfo;  
};

const addScoreDetail = async ship => {
    const scoreInfo = await getScoreInfo(ship.mint);

    ship.score = { 
        ...scoreInfo,
        rewardRatePerSecond: scoreInfo.rewardRatePerSecond.toNumber()
    };
    return ship.symbol;
};

export const getShipScoreDetails = async () => {
    const shipsToScore = [...shipList];

    while (shipsToScore.length) {
        await sleep(110);
        const next = await addScoreDetail(shipsToScore.pop());
        console.log(next, '|', shipsToScore.length, ' left');
    }

    ships.set(shipList);
    composeScores(shipList);
};

const composeScores = (() => {

    const capacityMap = {
        arms: 'armsMaxReserve',
        food: 'foodMaxReserve',
        fuel: 'fuelMaxReserve',
        tool: 'toolkitMaxReserve'
    };

    const burnTimeMap = {
        arms: 'millisecondsToBurnOneArms',
        food: 'millisecondsToBurnOneFood',
        fuel: 'millisecondsToBurnOneFuel',
        tool: 'millisecondsToBurnOneToolkit'
    };

    const supplies = [ 'arms', 'food', 'fuel', 'tool'];
    const SECONDS_PER_DAY = 60 * 60 * 24;

    const composeScore = ship => {
        const delivery = {
            burnDaily: {},
            capacity: {},
            burnTime: {}
        };
        for (const supply of supplies) {
            const secondsToBurnOne = ship.score[burnTimeMap[supply]] / 1000;
            delivery.burnDaily[supply] = SECONDS_PER_DAY / secondsToBurnOne;
            delivery.capacity[supply] = ship.score[capacityMap[supply]];
            delivery.burnTime[supply] = (delivery.capacity[supply] * secondsToBurnOne) / SECONDS_PER_DAY; 
        }
        return delivery;
    };

    return (allShips) => {
        const data = {};
        for (const ship of allShips) {
            data[ship.symbol] = composeScore(ship);
        }

        window.SCOREZ = data;

        console.log('  ');
        console.log('-------');
        console.log('window.SCOREZ', data);
        console.log('shipList', allShips);
    };
})();
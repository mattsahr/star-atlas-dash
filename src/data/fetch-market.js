import _cloneDeep from 'lodash/cloneDeep';
import { ships, shipPrices, shipTrades, tokenPrices } from './app-store.js';

const baseTrade = { op: 'subscribe', channel: 'trades' };
const baseL2 = { op: 'subscribe', channel: 'level2' };

const dummyOjbect  = {};
const oneMinute = 1000 /* ms */ * 60;

let currentPrices = {};
let currentTokens = {};
let currentTrades = {};
let shipList = [];

ships.subscribe(list => {shipList = list; });
shipPrices.subscribe(priceMap => { currentPrices = priceMap; });
shipTrades.subscribe(tradeMap => { currentTrades = tradeMap; });
tokenPrices.subscribe(priceMap => { currentTokens = priceMap; });

export const updateTokenPrices = (() => {

    const tokens = [
        { market: 'ATLAS/USDC', dexlabAddress: 'Di66GTLsV64JgCCYGVcY21RZ173BHkjJVgPyezNN7P1K' },
        { market: 'POLIS/USDC', dexlabAddress: 'HxFLKUAmAMLz1jtT3hbvCMELwH5H9tpM2QugP8sKyfhW' },
        { market: 'SOL/USDC',   dexlabAddress: '9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT' }
    ];

    const priceURL = address => 'https://open-api.dexlab.space/v1/prices/' + address + '/last';
    const yesterdayURL = address => 'https://open-api.dexlab.space/v1/prices/' + address + '/closing-price';
    // const last24URL =  address => 'https://open-api.dexlab.space/v1/trades/' + address + '/24h';

    return async () => {

        for (const token of tokens) {
            const results = await fetch(priceURL(token.dexlabAddress));

            if (results.ok) {
                const price = await results.json();

                if (price.success && price.data) {
                    currentTokens[token.market] = Number(price.data.price);
                    tokenPrices.set(currentTokens);
                }
            }

        }

        for (const token of tokens) {
            const results = await fetch(yesterdayURL(token.dexlabAddress));

            if (results.ok) {
                const price = await results.json();

                if (price.success && price.data) {
                    currentTokens['CLOSE ' + token.market] = Number(price.data.price);
                    tokenPrices.set(currentTokens);
                }
            }

        }

    };

})();

const getShip = (shipList, message) => {
    return shipList.find(ship => ship.markets.find(market => market.id === message.market));
};

export const updatePrices = (() => {

    const sortByPrice = (A, B) => Number(A[0]) > Number(B[0]) 
        ? 1 
        : Number(A[0]) < Number(B[0]) 
            ? -1 
            : 0;

    const getHighest = (A, B) => {
        if (!A && !B) { return 0;}
        const a = Number(A || 0);
        const b = Number(B || 0);
        return Math.max(a, b); 
    };

    const getLowest = (A, B) => {
        if (!A && !B) { return 0; }
        const a = Number(A || Infinity);
        const b = Number(B || Infinity);
        return Math.min(a, b); 
    };

    return messageObject => {

        const message = JSON.parse(messageObject.data);

        if (!message) { return; }

        if (message.type === 'recent_trades') {
            return updateTrades(message);
        }

        if (message.type !== 'l2snapshot' && message.type !== 'l2update') { return; }

        const ship = getShip(shipList, message);

        if (!ship) { return; }

        const prices = { ...currentPrices };

        const asks = message.asks.sort(sortByPrice);
        const bids = message.bids.sort(sortByPrice);

        let lowestAsk = asks[0];
        let highestBid = bids[bids.length - 1];

        lowestAsk = lowestAsk ? lowestAsk[0] : 0;
        highestBid = highestBid ? highestBid[0] : 0;

        ship.prices = prices[ship.id] = { 
            ...(prices[ship.id] || dummyOjbect), 
            name: ship.name, 
            id: ship.id 
        };

        const market = ship.markets.find(market => market.id === message.market);

        if (market.quotePair === 'ATLAS') {
            prices[ship.id].askATLAS = getLowest(prices[ship.id].askATLAS, lowestAsk);
            prices[ship.id].bidATLAS = getHighest(prices[ship.id].bidATLAS, highestBid);
        }

        if (market.quotePair === 'USDC') {
            prices[ship.id].askUSDC = getLowest(prices[ship.id].askUSDC, lowestAsk);;
            prices[ship.id].bidUSDC = getHighest(prices[ship.id].bidUSDC, highestBid);
        }

        ships.set(shipList);
        shipPrices.set(prices);
    };
})(); 

export const updateTrades = (() => {

    const dummyDay = { 
        openStamp: 7258118400000,
        closeStamp: 0,
        open: 0, close: 0, 
        low: Infinity, 
        high: -Infinity 
    };


    /*
    const sortDatez = (A, B) => (A[0] > B[0]) ? 1 : (A[0] < B[0]) ? -1 : 0;
    const composeTradeDataCandles = (source, prior) => {
        const datez = {};

        for (const item of source) {
            const day = item.timestamp.split('T')[0];
            const stamp = new Date(item.timestamp).getTime();

            const mapDate = datez[day] = datez[day] || { ...dummyDay, time: day };
            const val = Number(item.price);

            if (val < mapDate.low) { mapDate.low = val; }
            if (val > mapDate.high) { mapDate.high = val; }

            if (stamp > mapDate.closeStamp) {
                mapDate.closeStamp = stamp;
                mapDate.close = val;
            }
            if (stamp < mapDate.openStamp) {
                mapDate.openStamp = stamp;
                mapDate.open = val;
            }
        }

        const trades = Object.entries(datez).sort(sortDatez).map(item => item[1]);

        if (prior && prior.length) {
            const additions = [];
            for (const tradeDay of prior) {
                if (!trades.find(day => day.time === tradeDay.time)) {
                    additions.push(tradeDay);
                }
            }
            if (additions.length) {
                return additions.concat(trades);
            }
        }

        return trades;
    };
    */

    const composeTradeData2 = (() => {

        const stampTime = dateString => {
            const dateStamp = new Date(dateString).getTime();
            return Math.round(dateStamp / 1000);
        };
        const convertTrade = trade => ({
            time: stampTime(trade.timestamp), 
            value: Number(trade.price)
        });

        const diffPriorTime = (batch, i) => (batch[i].time !== batch[i-1].time);

        const nextTimeFar = (batch, i) => (!batch[i+1] 
            ? true 
            : (batch[i+1].time - batch[i].time) > 1
        );

        const sortTime = (A, B) => (A.time > B.time) ? 1 : (A.time < B.time) ? -1 : 0;

        return (sourceTrades, prior) => {
            const batch = sourceTrades.map(convertTrade).sort(sortTime);

            const delivery = [batch[0]];

            for (let i = 1; i < batch.length; i++) {
                if (diffPriorTime(batch, i)) {
                    delivery.push(batch[i]);
                } else if (nextTimeFar(batch, i)) {
                    batch[i].time++;
                    delivery.push(batch[i]);
                }
            }

            if (prior) {
                for (const trade of prior) {
                    if (!delivery.find(next => next.time === trade.time)) {
                        delivery.push(trade);
                    }
                }
            }

            delivery.sort(sortTime);

            return delivery;
        };
    
    })(); 

    return message => {

        if (!message.trades || !message.trades.length) {
            // console.error('BAD TRADE MESSAGE');
            // console.log(message);
            return;
        }

        const ship = getShip(shipList, message);
        if (!ship) { return; }

        const { quotePair } = ship.markets.find(next => next.id === message.market);
        const allTrades = _cloneDeep(currentTrades);

        const trades = allTrades[ship.id] = allTrades[ship.id] || {};
        trades[quotePair] = composeTradeData2(message.trades, trades[quotePair]);
        shipTrades.set(allTrades);

        // console.group('UPDATE TRADES');
        // console.log('message', message);
        // console.log('ship', ship);
        // console.log('trades', trades);
        // console.groupEnd();

    };
})();

let ws = null;

/*
const getFTXTrades = (() => {

    const handleResults = wsResponse => {
        console.log('results', wsResponse);
        const results = JSON.parse(wsResponse.data);
        console.log('results!', results);
    };

    return () => {
        ftx.init(handleResults);

        setTimeout(() => {
            ftx.fetchPrices('ATLAS/USD');
        }, 5000);
        
    };
})();
*/
const getDexlabTrades = (() => {

    const getDexURL = address => 'https://open-api.dexlab.space/v1/trades/' +
        address + '/24h';

    const composeMessage = (results, market) => {
        const trades = results.data
            .filter(item => item.side === 'buy')
            .map(item => ({
                    type: item.type,
                    price: item.price,
                    side: item.side,
                    timestamp: item.time,
                    size: item.size,
                    market: market.id

                })
            );
        const message = {
            market: market.id,
            timestamp: Date.now(),
            type: 'recent_trades',
            trades
        };
        return message;
    };

    return async market => {
        const results = await fetch(getDexURL(market.id));

        if (results.ok) {
            const trades = await results.json();
            if (trades.success && trades.data && trades.data.length);

            const message = composeMessage(trades, market);

            // console.group('DEX LAB TRADES');
            // console.log('MARKET', market);
            // console.log('Dex trades', trades);
            // console.log('Faux SA trade', message);
            // console.groupEnd();

             updateTrades(message);

        }
    };

})();

export const getTrades = (() => {

    const tradeTracker = {};

    return ship => {
        if (!ws) { return; }

        if (tradeTracker[ship.id]) { return; }
        tradeTracker[ship.id] = true;

        for (const market of ship.markets) {
            ws.send(JSON.stringify({ ...baseTrade, markets: [market.id] }));
            getDexlabTrades(market);
        }
    };
})();


export const getPrices = () => {

    // DONT INITIALIZE MORE THAN ONCE
    if (ws) { return; }

    if (!shipList || !shipList.length) {
        console.log('NOT INITIATED -- SHIP LIST EMPTY??');
        return;
    }

    //getFTXTrades();

    updateTokenPrices();
    setInterval(updateTokenPrices, oneMinute);

    ws = new WebSocket('wss://serum-vial.staratlas.cloud/v1/ws');
    ws.onmessage = updatePrices;

    const shipsToGet = [ ...shipList ];

    const getNextShip = () => {
        if (shipsToGet.length) {
            const ship = shipsToGet.shift();
            for (const market of ship.markets) {
                ws.send(JSON.stringify({ ...baseL2, markets: [market.id] }));
            }
            callNext();
        }
    };

    const callNext = () => { 
        // THE 'wss://serum-vial.staratlas.cloud/v1/ws' ENDPOINT 
        // ALLOWS ONLY 50 CONNECTIONS PER SECOND, SO WE THROTTLE
        // TO 40 REQUESTS PER SECOND TO BE SAFE
        setTimeout(getNextShip, 50);
    };

    ws.onopen = callNext;
};


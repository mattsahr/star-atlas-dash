import { HmacSHA256 } from './static_dependencies/crypto-js/crypto-js';

const WEBSOCKET_INIT = 'WEBSOCKET_INIT';
/*

import time
import hmac
from requests import Request

ts = int(time.time() * 1000)
request = Request('GET', '<api_endpoint>')
prepared = request.prepare()
signature_payload = f'{ts}{prepared.method}{prepared.path_url}'
if prepared.body:
    signature_payload += prepared.body
signature_payload = signature_payload.encode()
signature = hmac.new('YOUR_API_SECRET'.encode(), signature_payload, 'sha256').hexdigest()

request.headers['FTX-KEY'] = 'YOUR_API_KEY'
request.headers['FTX-SIGN'] = signature
request.headers['FTX-TS'] = str(ts)

*/

const  url = 'https://ftx.com/api';

/*
'FTX-KEY': Your API key
FTX-TS: Number of milliseconds since Unix epoch
FTX-SIGN: SHA256 HMAC of the following four strings, using your API secret, as a hex string:

    Request timestamp (e.g. 1528394229375)
    HTTP method in uppercase (e.g. GET or POST)
    Request path, including leading slash and any URL parameters but not including the hostname (e.g. /account)
    (POST only) Request body (JSON-encoded)

FTX-SUBACCOUNT (optional): URI
}
*/

/*
this.checkRequiredCredentials ();
const timestamp = this.milliseconds ().toString ();
let auth = timestamp + method + request;
headers = {};
if ((method === 'POST') || (method === 'DELETE')) {
body = this.json (query);
auth += body;
headers['Content-Type'] = 'application/json';
}
const signature = this.hmac (this.encode (auth), this.encode (this.secret), 'sha256');
headers[headerPrefix + '-KEY'] = this.apiKey;
headers[headerPrefix + '-TS'] = timestamp;
headers[headerPrefix + '-SIGN'] = signature;
if (chosenSubaccount !== undefined) {
headers[subaccountField] = chosenSubaccount;
}
}
return { 'url': url, 'method': method, 'body': body, 'headers': headers };
*/

const getTradeHeaders = (marketRequest) => {

    const ts = Date.now();
    const auth = ts + 'GET' + /api/ + marketRequest;
    const dada = 'Z5VmojJFYE_VNp4aBBuwKuKxv0xSEaXy1QOg6HTW';
    const signature = HmacSHA256(auth, dada);

    return {
        // 'Content-Type': 'application/json',
        'FTX-KEY': '57Pzrikk1BLKAiJdUpBh-HBKf3N4SWvvLX65SuGu',
        'FTX-TS': ts,
        'FTX-SIGN': signature
    };
};

export const ftx = (() => {
    const ftxKey = '57Pzrikk1BLKAiJdUpBh-HBKf3N4SWvvLX65SuGu';

    let resultsHandler = () => false;

    const init = upstreamResultsHandler => {
        resultsHandler = upstreamResultsHandler;
        resultsHandler({ data: '["wooot!"]'});

        fetchPrices(WEBSOCKET_INIT);
    };

    let ws;

    const fetchPrices = async market => { // BTC-0628

        if (!ws  && market === WEBSOCKET_INIT) { 
            ws = new WebSocket('wss://ftx.com/ws/');
            ws.onmessage = resultsHandler;

            ws.onopen = () => {
                // 'op': 'login', 'args': {'key': <api_key>, 'sign': <signature>, 'time': <ts>}

                const ts = Date.now();
                const auth = ts; // + 'GET' + /api/ + marketRequest;
                const dada = 'Z5VmojJFYE_VNp4aBBuwKuKxv0xSEaXy1QOg6HTW';
                const signature = HmacSHA256(auth, dada);

                ws.send(JSON.stringify({ 
                    op: 'login', 
                    args: {
                        key: ftxKey,
                        sign: signature, 
                        time: ts
                    }
                }));
            };

        } else {
            ws.send(JSON.stringify({op: 'subscribe', channel: 'trades', market})); // 'BTC-PERP'
        }


            

        /*
        const results = await fetch(
            url + '/markets/' + market,
            {
                method: 'GET',
                referrerPolicy: "unsafe-url",
                headers: getTradeHeaders('markets/' + market)
            }
        );

        if (results.ok) {
            const priceData = await results.json();
            resultsHandler(priceData);
        } else {
            console.error('FETCH PRICE ERROR');
            console.log(results);
        }
        */
    };


    return {
        init,
        fetchPrices
    };
}
)();

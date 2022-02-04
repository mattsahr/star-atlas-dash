// import Cookies from 'lib/cookies-js';

// =========== RESIZE END EVENT ===============================
(function() {
    'use strict';
    var EVENT_KEY = 'resizeend',
        TIMEOUT = 200;
    var timer;

    function callResizeEnd() {
        var event = new window.CustomEvent(EVENT_KEY);
        window.dispatchEvent(event);
    }

    window.addEventListener('resize', () => {
        clearTimeout(timer);
        timer = setTimeout(callResizeEnd, TIMEOUT);
    });
})();


// =========== EXPOSE DOCUMENT WIDTH TO THE APP =================
let docWidth = 0;
export const getDocWidth = () => docWidth;
let docHeight = 0;
export const getDocHeight = () => docHeight;

const refreshDocDimensions = () => {
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    docWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    docHeight = w.innerHeight || e.clientHeight || g.clientHeight;
};
window.addEventListener('resizeend', refreshDocDimensions);
refreshDocDimensions();

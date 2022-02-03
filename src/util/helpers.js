export const sortBy = (field, custom) => {
    if (!custom) {
        return (A, B) => {
            if (A[field] > B[field]) { return 1; }
            if (A[field] < B[field]) { return -1; }
            return 0;
        };
    }

    return (A, B) => {
        if (!custom[A[field]]) {
            console.error('A', A[field], A);
        }
        if (!custom[B[field]]) {
            console.error('B', B[field], B);
        }
        if (custom[A[field]] > custom[B[field]]) { return 1; }
        if (custom[A[field]] < custom[B[field]]) { return -1; }
        return 0;
    };

};

export const calc = (() => {

    const apr = (type, ship, tokenPrices) => {
        if (!tokenPrices['ATLAS/USDC']) {
            return 0;
        }
        let price = 0;

        if (type === 'VWAP') {
            price = ship.tradeSettings.vwap;
        } else if (type === 'askUSDC') {
            price = ship.prices && ship.prices.askUSDC;
        }

        const burn = ship.burnDailyAtlas;
        const earn = ship.earnDailyAtlas;

        if (!price || !burn || !earn) {
            return 0;
        }

        const atlas = Number(tokenPrices['ATLAS/USDC']);

        const goal = price/atlas;
        const dayNet = earn - burn;
        const daysToGoal = goal / dayNet;

        const apr = 365 / daysToGoal;

        return apr;
    };

    return {
        apr
    };
})();
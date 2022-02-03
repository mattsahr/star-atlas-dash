import { collection } from './collection';
import { linesCollection } from './lines';
export function seriesCollection(target, params = []) {
    return collection(target, params, series, (p) => p.reference);
}
export function series(target, params) {
    let subject = createSeries(target, params);
    let reference;
    let lines = linesCollection(subject, params.priceLines);
    return {
        update(nextParams) {
            if (nextParams.type !== subject.seriesType()) {
                lines.destroy();
                target.removeSeries(subject);
                // TODO: where is reference update?
                subject = createSeries(target, nextParams);
                lines = linesCollection(subject, params.priceLines);
                return;
            }
            if (nextParams.options) {
                subject.applyOptions(nextParams.options);
            }
            lines.update(nextParams.priceLines);
        },
        updateReference(nextReference) {
            if (nextReference !== reference) {
                reference === null || reference === void 0 ? void 0 : reference(null);
                reference = nextReference;
                reference === null || reference === void 0 ? void 0 : reference(subject);
            }
        },
        destroy() {
            reference === null || reference === void 0 ? void 0 : reference(null);
            target.removeSeries(subject);
        }
    };
}
function createSeries(chart, params) {
    switch (params.type) {
        case 'Area': {
            const series = chart.addAreaSeries(params.options);
            series.setData(params.data);
            return series;
        }
        case 'Bar': {
            const series = chart.addBarSeries(params.options);
            series.setData(params.data);
            return series;
        }
        case 'Candlestick': {
            const series = chart.addCandlestickSeries(params.options);
            series.setData(params.data);
            return series;
        }
        case 'Histogram': {
            const series = chart.addHistogramSeries(params.options);
            series.setData(params.data);
            return series;
        }
        case 'Line': {
            const series = chart.addLineSeries(params.options);
            series.setData(params.data);
            return series;
        }
    }
}

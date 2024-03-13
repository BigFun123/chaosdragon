const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { MeterProvider }  = require('@opentelemetry/sdk-metrics');

// Add your port and startServer to the Prometheus options
const options = {port: 9464};
const exporter = new PrometheusExporter(options);

// Creates MeterProvider and installs the exporter as a MetricReader
const meterProvider = new MeterProvider();
meterProvider.addMetricReader(exporter);
const meter = meterProvider.getMeter('example-prometheus');

// Now, start recording data
const counter = meter.createCounter('tester', {
  description: 'Example of a counter'
});
counter.add(10, { pid: process.pid });
counter.add(10, { pid: process.pid });
counter.add(10, { pid: process.pid });
setInterval(() => {
counter.add(10, { pid: process.pid });
}, 1000);

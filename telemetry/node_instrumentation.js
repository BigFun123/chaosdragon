const opentelemetry = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');

const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');

const { FsInstrumentation } = require('@opentelemetry/instrumentation-fs');

const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

const provider = new NodeTracerProvider();
provider.register();

const sdk = new opentelemetry.NodeSDK({
  metricReader: new PrometheusExporter({
    port: 9464, // optional - default is 9464
  }),
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [
    new FsInstrumentation({
      // see below for available configuration
    }),
    getNodeAutoInstrumentations(), ],
});
sdk.start();
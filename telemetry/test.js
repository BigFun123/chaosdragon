const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('dice-lib');

/*app.js*/
const express = require('express');
const fs = require('fs');

//const opentelemetry = require('@opentelemetry/sdk-node');

const PORT = parseInt(process.env.PORT || '8080');
const app = express();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/rolldice', (req, res) => {
  const span = tracer.startSpan("roll");
  const result = getRandomNumber(1, 6).toString()
  // write to log file
  fs.appendFileSync('log.txt', `Rolled dice ${result}\n`);

  span.setStatus("OK");
  span.end();
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});

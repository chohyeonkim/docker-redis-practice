const express = require('express');
const redis = require('redis');

// redis client
const client = redis.createClient({

  socket: {

  host: "redis-server",

  port: 6379

  }

});

const PORT = 8080;
// const HOST = '0.0.0.0'; //HOST 지정이유

const app = express();

app.get('/', async (req, res) => {

  await client.connect();

  let number = await client.get('number');

  // initailize number
  if (number === null) {

    number = 0;

  }

  console.log('Number: ' + number);

  res.send("number of counts: " + number)

  await client.set("number", parseInt(number) + 1)

  await client.disconnect();


});

app.listen(PORT);
// console.log(`Running on http://${HOST}:${PORT}`);
console.log("Server is running")
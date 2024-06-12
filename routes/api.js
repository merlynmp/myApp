var express = require('express');
var router = express.Router();
const axios = require('axios'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/prices/:stock/:multiply/:time/:from/:to", function(req, res, next) {
  const newstock = req.params.stock;
  const baseUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  const startDate = req.params.from;
  const endDate = req.params.to;
  const multiplier = req.params.multiply;
  const timespan = req.params.time;

  const url = `${baseUrl}/${newstock}/range/${multiplier}/${timespan}/${startDate}/${endDate}?apiKey=${apiKey}`;
  console.log(url);

  axios
  .get(url, {
      headers: {
        "User-Agent": "request",
      },
      params: {
       
      },
    })
    .then((response) => {
      if ("Error Message" in response.data) {
        next(response.data);
      } else {
        res.json(response.data);
        console.log(response.data);
      }
    })
    .catch((error) => {
      next(error);
    });
 
});

/*router.get("/prices/:stock", function (req, res, next) {
  console.log(req.params.stock);
  axios
    .get(process.env.API_URL, {
      json: true,
      headers: { "User-Agent": "request" },
      params: {
        //function: "aggs",
        symbol: req.params.stock,
        multiplier: "1",
        timespan: "day",
        from: "2024-01-01",
        to: "2024-05-01",
      },
    })
    .then((response) => {
      if ("Error Message" in response.data) {
        next(response.data);
      }
      res.json(response.data);
    })
    .catch((error) => {
      next(error);
    });
  });*/

router.get("/prices/:stock", function (req, res, next) {

  if (!req.params.stock) {
    return res.status(400).json({ error: "Stock symbol is required" });
  }
  
  // Log user input for debugging
  console.log(req.params.stock);

  // Assign user input to variable
  const newstock = req.params.stock;
  const baseUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  const startDate = "2024-05-31";
  const endDate = "2024-06-07";
  const multiplier = "1";
  const timespan = "day";

  const url = `${baseUrl}/${newstock}/range/${multiplier}/${timespan}/${startDate}/${endDate}?apiKey=${apiKey}`;
  console.log(url);

  axios
  .get(url, {
      headers: {
        "User-Agent": "request",
      },
      params: {
        /*apiKey: apiKey,
        startDate : "2024-01-01",
        endDate : "2024-05-01",
        multiplier : "1",
        timespan : "day",*/
      },
    })
    .then((response) => {
      if ("Error Message" in response.data) {
        next(response.data);
      } else {
        res.json(response.data);
        console.log(response.data);
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;

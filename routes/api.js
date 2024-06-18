// import express and axios
var express = require('express');
var router = express.Router();
const axios = require('axios'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// official getter
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


module.exports = router;

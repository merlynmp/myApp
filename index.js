const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');

axios
  	.get(process.env.API_URL, {
    		json: true,
    		headers: { "User-Agent": "request" },
    		params: {
      			//function: "aggregates",
      			//stocksTicker: "APPL",
      			//multiplier: "5min",
                //timespan: "day",
                //from: "2024-01-01",
                //to: "2024-05-01",
      			//apikey: process.env.API_KEY,
    		},
  	})
  	.then((response) => {
    		console.log(response.data);
  	})
  	.catch((error) => {
    		console.log("This is an error");
  	});
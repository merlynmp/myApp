# What is StockSearch?
StockSearch is a web application that implements POLYGON API for stock information displayed in tables and charts.


# How to run
At the top, you would see the option to type and submit something.
Since we need to follow the [POLYGON API](https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to) format, you would type in: 

`Stock name_Multiplier_Timespan_Start date_End date_specific result`

For example:

`AAPL 1 day 2024-05-01 2024-06-01 h`

The following above would show a table/chart that 
1. consists all of the data of the AAPL stock 
2. multiplier 
3. data of each day 
4. starting at the beginning of may of this year
5. ending at the beginning of june of this year
6. show the highest price

## How do I know which letter to choose at the end?
In the website, you would be shown 8 buttons that will display definitions when clicked.

The buttons are: o, c, h, l, n, t, v, vw.

Basically, you do not have to write h as shown in the example above. If you want the data of the lowest price, write l instead.

# How can I recreate this application?
There are numerous ways this type of stock application can be created. This would be a skim-through guide.
Installations
1. An IDE (I used VS Code)
2. Node.js

Create a new folder in command line and step into it. Then type `npm init`. Only type in `yes` when asked. Lastly, type `. code` to 
access the folder in VS Code. This would be our application workspace. A package.json file would be already created. Modify the package.json file as needed.

Create an .env file ny typing `npm i dotenv` in the terminal. Through this file, we can use variables that need to be hidden from the public. Information such as API Key should be hidden and can only be accessed from the creator of the application.

Create a js file. Type the following:
`const dotenv = require("dotenv");`
`dontenv.config();`

In command line, type in the following: `npx express-generator --view=hjs *name of folder*` Enter y when needed. This would create a few files in the folder that can be utilized to create the web application.

In your user.js file, here you would be able to access the stock data by implementing axios. In the command prompt, do `npm i axios`. Then type the following: `const axios = require("axios");` `axios.config();` Next, you can access the [axios documentation](https://axios-http.com/docs/intro) to figure out the next steps

The frontend can be created in index.hjs with html and css/bootstrap. Under public > javascripts > main.js is where you can implement the data into the tables and charts.

Chart.js can be used to create charts.
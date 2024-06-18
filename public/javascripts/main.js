// from index.hjs
function myFunction(e) {
    e.preventDefault();

    // store value that was typed and submitted
    const input = document.getElementById("stock").value;

    // const input2 = document.getElementById("Info").value;

    // an array. split the whole string into seperate strings
    const words = input.split(" ")

    // send to other funtion
    getStocks(words);
  
    return false;
  }
  
  function getStocks(words) {
    /*populateTable([]);/${m}/${t}/${s}/${e}*/

    // get the api data from api.js
    axios
      .get(`/api/prices/${words[0]}/${words[1]}/${words[2]}/${words[3]}/${words[4]}`, {
        json: true,
      })
      .then((response) => {

        // send data to function
        populateTable(response.data);

        // send data to function
        populateChart(response.data, words);

        // print data to check
        console.log(response.data);
 
      })
      .catch((error) => {
        console.error(error);
      });

      

  }

  // to create chart
  function populateChart(data, words) {

    // letter would be a string of the specific measure we want from the api, ex: high, low
    const letter = words[5];

    // values of the specific measure
    let array_one = [];

    // for date
    let array_count=[];
    let i = 0;

    // going through the api data, store the specific measure to the array
    // increase i by 1 and store to array
    data.results.forEach(result => {
      array_one.push(result[letter]);
      i++;
      array_count.push(i);
    });

    // creating chart
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        // x valye
        labels: array_count,
        datasets: [{
          // specific measure letter
          label: words[5],
          // api data
          data: array_one,
          borderColor: '#000000',
          backgroundColor: '#097969',
          pointHoverBackgroundColor: '#DE3163',
          borderWidth: 1   
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            backdropColor: '#A9A9A9'
          },
          x: {
            title: {
              color: 'green',
              display: true,
              text: 'Day'
            }
          }
        }
      }
    });
   }
  
  function populateTable(data) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    /*const array = generateRandomArray(generateRandomNumber(10));*/
    const array = data;
    const template = document.getElementById("table-row");
    const templateCell = document.getElementById("table-cell");
    const row = template.content.querySelector("tr");
    const cell = templateCell.content.querySelector("td");
    i = 0;

    // going through the results in the api data, append the data for every row
    // a is row and myCell is the data that is appended to the row
    array.results.forEach(result => {
      // date
      const a = document.importNode(row, true);
      let myCell = document.importNode(cell, true);
      i++;
      myCell.innerHTML = i;
      a.appendChild(myCell);

      // open
      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.o;
      a.appendChild(myCell);
      
      // close
      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.c;
      a.appendChild(myCell);

      // high
      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.h;
      a.appendChild(myCell);

      // low
      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.l;
      a.appendChild(myCell);

      // volume
      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.v;
      a.appendChild(myCell);

      // volume weighted
      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.vw;
      a.appendChild(myCell);

      // timestamp
      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.t;
      a.appendChild(myCell);

      // number
      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.n;
      a.appendChild(myCell);
  
      // append the finished row to the table
      tableBody.appendChild(a);
  
    })
  
    document.getElementById("table").classList.remove("d-none");
  }
  
  function generateRandomArray(amount) {
    const array = [];
    for (let i = 0; i < amount; i++) {
      array.push({
        name: `Name ${i}`,
        min: generateRandomNumber(10),
        max: generateRandomNumber(100),
      });
    }
    return array;
  }
  
  // generates random number between 1 and max
  function generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }
function myFunction(e) {
    e.preventDefault();
    const input = document.getElementById("stock").value;
    // const input2 = document.getElementById("Info").value;
    const words = input.split(" ")
    getStocks(words);
  
    return false;
  }
  
  function getStocks(words) {
    /*populateTable([]);/${m}/${t}/${s}/${e}*/
    axios
      .get(`/api/prices/${words[0]}/${words[1]}/${words[2]}/${words[3]}/${words[4]}`, {
        json: true,
      })
      .then((response) => {
        populateTable(response.data);
        populateChart(response.data, words);
        console.log(response.data);
 
      })
      .catch((error) => {
        console.error(error);
      });

      

  }

  function populateChart(data, words) {
    const letter = words[5];
    let array_one = [];
    let array_count=[];
    let i = 0;
    data.results.forEach(result => {
      array_one.push(result[letter]);
      i++;
      array_count.push(i);
    });

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: array_count,
        datasets: [{
          label: words[5],
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
    array.results.forEach(result => {
      const a = document.importNode(row, true);
      let myCell = document.importNode(cell, true);
      i++;
      myCell.innerHTML = i;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.o;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.c;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.h;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.l;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.v;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.vw;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.t;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.n;
      a.appendChild(myCell);
  
      tableBody.appendChild(a);
  
    })
    /*array.forEach((element) => {
      const a = document.importNode(row, true);
      let myCell = document.importNode(cell, true);
      myCell.innerHTML = element.name;
      a.appendChild(myCell);
  
      myCell = document.importNode(cell, true);
      myCell.innerHTML = element.min;
      a.appendChild(myCell);
  
      myCell = document.importNode(cell, true);
      myCell.innerHTML = element.max;
      a.appendChild(myCell);
  
      tableBody.appendChild(a);
    });*/
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
function myFunction(e) {
    e.preventDefault();
    const input = document.getElementById("stock").value;
    getStocks(input);
  
    return false;
  }
  
  function getStocks(input) {
    /*populateTable([]);*/
    
    axios
      .get(`/api/prices/${input}`, {
        json: true,
      })
      .then((response) => {
        populateTable(response.data);
        console.log(response.data);
        const highValues = [];
        const lowValues = [];

        response.data.results.forEach( result => {
          highValues.push(result.h);
          lowValues.push(result.l);
        });

        console.log(highValues);
        console.log(lowValues)

        
      })
      .catch((error) => {
        console.error(error);
      });


    //setTimeout(arguments.callee, 5000);
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
      myCell.innerHTML = result.l;
      a.appendChild(myCell);

      myCell = document.importNode(cell, true);
      myCell.innerHTML = result.h;
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
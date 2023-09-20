document.addEventListener('DOMContentLoaded', onDomLoaded);
const headingKeysNeeded = ['name', 'username', 'email', 'phone', 'website']
function onDomLoaded() {
  showLoader(true);
  getUserData();
}
function showLoader(isLoading) {
  const loader = document.getElementById('loader');
  if (isLoading) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
}

async function getUserData() {
  // const xmlHttpRequestObject = new XMLHttpRequest();
  const body = document.querySelector('body');
  const paragraph = document.createElement('p');
  paragraph.id = 'response-para';
  paragraph.classList.add('paragraph-text');
  // xmlHttpRequestObject.open("GET", 'https://jsonplaceholder.typicode.com/users');
  // xmlHttpRequestObject.responseType = 'json';
  // xmlHttpRequestObject.send();
  // xmlHttpRequestObject.onload = function () {
  //   if (xmlHttpRequestObject.readyState === 4 && xmlHttpRequestObject.status == 200) {
  //     createTable(body, xmlHttpRequestObject.response);
  //     showLoader(false);
  //   } else {
  //     showLoader(false);
  //     paragraph.innerHTML = 'A server error occured';
  //     body.append(paragraph);
  //   }
  // }
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(function(response) {
    response.json()
    .then(function(users) {
      createTable(body, users)
    })
    .catch(function(e) {
      throw e;
    })
  })
  .catch(function(err) {
    console.log(err);
  })
  .finally(function() {
    showLoader(false);
  })
  const fetchPromise = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await fetchPromise.json();
  createTable(body, users);
  showLoader(false);
}

function createTable(body, response) {
  const table = document.createElement('table');
  table.classList.add('my-table');
  table.setAttribute('border', '1px solid black');
  const tableHead = document.createElement('thead');
  tableHead.classList.add('table-head');
  createTableHead(tableHead, response);
  const tableBody = document.createElement('tbody');
  tableBody.classList.add('table-body');
  createTableBody(tableBody, response);
  table.append(tableHead, tableBody);
  body.append(table);
}
function createTableHead(tableHead, response) {
  const tr = document.createElement('tr');
  const row1 = response[0];
  const headingKeys = Object.keys(row1);
  for(let i = 0; i<headingKeys.length; i++) {
    if (headingKeysNeeded.includes(headingKeys[i])) {
      const th = document.createElement('th');
      th.classList.add('column-heading');
      th.innerText = headingKeys[i];
      tr.append(th);
    }
  }
  tableHead.append(tr);
}
function createTableBody(tableBody, response) {
  for (let i = 0; i < response.length; i++) {
    const tr = document.createElement('tr');
    tr.classList.add('body-row');
    for (let j = 0; j < headingKeysNeeded.length; j++) {
      const td = document.createElement('td');
      td.classList.add('body-cell');
      td.innerHTML = response[i][headingKeysNeeded[j]];
      tr.append(td)
    }
    tableBody.append(tr);
  }
}
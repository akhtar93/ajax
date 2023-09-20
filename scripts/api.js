const xmlHttpRequestObject = new XMLHttpRequest();

function get() {
  xmlHttpRequestObject.open("GET", 'https://jsonplaceholder.typicode.com/users');
  xmlHttpRequestObject.responseType = 'json';
  xmlHttpRequestObject.send();
  xmlHttpRequestObject.onload = function () {
    if (xmlHttpRequestObject.readyState === 4 && xmlHttpRequestObject.status == 200) {
      return xmlHttpRequestObject.response;
    } else {
      console.log(xmlHttpRequestObject);
    }
  }
}
function getById(id) {
  xmlHttpRequestObject.open("GET", `https://jsonplaceholder.typicode.com/users/${id}`);
  xmlHttpRequestObject.responseType = 'json';
  xmlHttpRequestObject.send();
  xmlHttpRequestObject.onload = function () {
    // all the response processing here
    console.log(xmlHttpRequestObject);
  }
}
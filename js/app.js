const address = "https://www.googleapis.com/books/v1/volumes?q=";
const input = document.querySelector(".book-search-input");
const resultDiv = document.querySelector(".book-search-result");
let timeout = setTimeout(() => {}, 0);
let searchRequest = "";

function getBooks(cb, query) {
  const xhr = new XMLHttpRequest();
  const searchAddress = address + query;
  xhr.open("GET", searchAddress);

  xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      cb(response);
  });
  xhr.send();
}

input.addEventListener("input", function() {
  clearTimeout(timeout);
  searchRequest = this.value;

  if(searchRequest.length > 2) {
    timeout = setTimeout(() => {
      getBooks(resultRendering, searchRequest);
    }, 1000)
  }
});


function resultRendering(response) {
  let fragment = "";
  const resultTitle = document.createElement("div");
  const resultDescription = document.createElement("div");
  const resultAuthor= document.createElement("div");

  const searchResult = response.items.forEach(bookItem => {
    const el = bookTemplate(bookItem.volumeInfo);
    fragment += el;
  });

  resultDiv.insertAdjacentHTML("afterbegin", fragment);
}

function bookTemplate({imageLinks = false, title, authors, description = "The book has no description"}) {
  const cover = imageLinks.thumbnail || "https://vitaldigital.us/wp-content/uploads/2017/11/book-placeholder-small.png";
  return `
  <div class="book-search-result__item">
    <img src="${cover}" alt="Cover">
    <h3 class="book-search-result__title">Title: <b>${title}</b></h3>
    <div class="book-search-result__author">Authors: <b>${authors}</b></div>
    <p class="book-search-result__description">${description}</p>
  </div>
  `
}



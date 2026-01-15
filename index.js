let emptyArray = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  emptyArray.push(newBook);
}

Book.prototype.readStatus = function () {
  const info = this.read ? "read" : "not read";
}

let newButton = document.getElementById("newBookBtn");
let modal = document.getElementById("bookDialog");
let form = document.getElementById("form");
let submitBtn = document.getElementById("submitBtn");

newButton.addEventListener("click", function () {
  modal.showModal();
});
/* 
const getBooksFromInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("readStatus").checked;
  return new Book(title, pages, author, read);
}
*/

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //const getBooksFromInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("readStatus").checked;
  addBookToLibrary(title, author, pages, read);
  
  form.reset();
  modal.close();
  }
);

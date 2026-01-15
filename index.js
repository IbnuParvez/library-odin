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
  this.read = !this.read;
}

let newButton = document.getElementById("newBookBtn");
let modal = document.getElementById("bookDialog");
let form = document.getElementById("form");
let submitBtn = document.getElementById("submitBtn");
let cancelBtn = document.getElementById("cancelBtn");

newButton.addEventListener("click", function () {
  modal.showModal();
});

function displayBooks() {
  const library = document.getElementById("libraryDisplay");
  library.innerHTML = "";
  emptyArray.forEach((book) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-card"); // Good for CSS styling later
    
    // 1. Create a separate element for the text
    const bookInfo = document.createElement("p");
    bookInfo.textContent = `${book.title} by ${book.author} (${book.pages} pages) - ${book.read ? "Read" : "Not Read"}`;
    newDiv.appendChild(bookInfo);    library.appendChild(newDiv);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    newDiv.append(removeBtn);
    removeBtn.addEventListener("click", function removeBook() {
      emptyArray = emptyArray.filter(item => item.id !== book.id);
      displayBooks();
    });
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    newDiv.append(toggleBtn);
    toggleBtn.addEventListener("click", function(){
      book.readStatus();
      displayBooks();
    });
  });
}

cancelBtn.addEventListener("click", () => {
  form.reset();
  modal.close();
});
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("readStatus").checked;
  addBookToLibrary(title, author, pages, read);
  form.reset();
  modal.close();
  displayBooks();
  }
);
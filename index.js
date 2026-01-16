const Library = (function () {
  // PRIVATE: These cannot be accessed from the browser console
  let _books = [];

  // The Constructor remains internal
  function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  Book.prototype.toggleRead = function () {
    this.read = !this.read;
  };

  // PUBLIC: These are the "buttons" we expose to the outside world
  const add = (title, author, pages, read) => {
    const newBook = new Book(title, author, pages, read);
    _books.push(newBook);
    render();
  };

  const remove = (id) => {
    _books = _books.filter((book) => book.id !== id);
    render();
  };

  const toggleStatus = (id) => {
    const book = _books.find((b) => b.id === id);
    if (book) book.toggleRead();
    render();
  };

  const render = () => {
    const display = document.getElementById("libraryDisplay");
    display.innerHTML = "";

    _books.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      card.innerHTML = `
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>By ${book.author}</p>
          <p>${book.pages} pages</p>
          <p class="status">${book.read ? "✅ Read" : "📖 Not Read Yet"}</p>
        </div>
        <div class="card-buttons">
          <button class="btn-success toggle-btn">Toggle Read</button>
          <button class="btn-danger remove-btn">Remove</button>
        </div>
      `;

      // Event Listeners for the buttons inside the card
      card.querySelector(".remove-btn").onclick = () => remove(book.id);
      card.querySelector(".toggle-btn").onclick = () => toggleStatus(book.id);

      display.appendChild(card);
    });
  };

  // Return only what the rest of the app needs
  return { add, render };
})();

// DOM ELEMENTS & EVENT LISTENERS
const modal = document.getElementById("bookDialog");
const form = document.getElementById("form");
const newBtn = document.getElementById("newBookBtn");
const cancelBtn = document.getElementById("cancelBtn");

newBtn.addEventListener("click", () => modal.showModal());

cancelBtn.addEventListener("click", () => {
  form.reset();
  modal.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("readStatus").checked;

  // We call the PUBLIC method from our Module
  Library.add(title, author, pages, read);

  form.reset();
  modal.close();
});
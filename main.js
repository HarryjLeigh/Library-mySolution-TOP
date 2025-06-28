import Book from "./book.js";

const form = document.getElementById("bookForm");
const cards = document.getElementById("cards-container");
const newBookButton = document.getElementById("newBookBtn");
const closeDialog = document.getElementById("closeDialog");
const dialog = document.querySelector("dialog");
const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, read);
  myLibrary.push(book);

  displayBooks();
}

function displayBooks() {
  cards.innerHTML = "";
  if (myLibrary.length === 0) return;
  myLibrary.forEach((book) => {
    const { title, author, pages, read } = book;
    const labels = ["Title: ", "Author: ", "Pages: ", "Has Read: "];

    const card = createCard([title, author, pages, read], labels);
    card.dataset.id = book.id;
    card.className = "card";
    cards.appendChild(card);
  });
}

function createCard(bookDetails, bookLabels) {
  const card = document.createElement("div");

  bookDetails.forEach((detail, index) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${bookLabels[index]}${detail}`;
    card.appendChild(paragraph);
  });

  const buttons = createCardButtons(
    ["Remove Book", "Change Status"],
    ["removeBookBtn", "changeStatusBtn"]
  );
  card.appendChild(buttons);

  return card;
}

function createCardButtons(btnContent, btnIds) {
  const cardButtonsContainer = document.createElement("div");
  cardButtonsContainer.classList.add("card-buttons");

  btnContent.forEach((content, index) => {
    const btn = document.createElement("button");
    btn.textContent = content;
    btn.type = "button";
    btn.className = `${btnIds[index]}`;
    cardButtonsContainer.append(btn);
  });

  return cardButtonsContainer;
}

function removeBook(id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
  }
  displayBooks();
}

function changeBookStatus(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) book.updateHasRead();
  displayBooks();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    title: this.elements["title"].value,
    author: this.elements["author"].value,
    pages: this.elements["pages"].value,
    read: this.elements["read"].checked,
  };

  addBookToLibrary(
    formData.title,
    formData.author,
    formData.pages,
    formData.read
  );

  this.reset();
});

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

document
  .getElementById("cards-container")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("removeBookBtn")) {
      const bookId = event.target.closest("[data-id]").dataset.id;
      removeBook(bookId);
    }
    if (event.target.classList.contains("changeStatusBtn")) {
      const bookId = event.target.closest("[data-id]").dataset.id;
      changeBookStatus(bookId);
    }
  });

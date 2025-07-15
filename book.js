class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `ID: ${this.id}, ${this.title} by ${this.author}, ${
      this.pages
    } pages, ${hasRead()}`;
  }

  hasRead() {
    return this.read ? "has read" : "not read yet";
  }

  updateHasRead() {
    this.read = !this.read;
  }
}

export default Book;

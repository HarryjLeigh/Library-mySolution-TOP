export function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `ID: ${this.id}, ${this.title} by ${this.author}, ${
      this.pages
    } pages, ${hasRead()}`;
  };

  function hasRead() {
    if (read) return "has read";
    else return "not read yet";
  }
}

Book.prototype.updateHasRead = function () {
  this.read = !this.read;
};

export default Book;

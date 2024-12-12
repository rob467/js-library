const bookDisplay = document.querySelector(".book-display")


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 293, read=false)
addBookToLibrary('Harry Potter', 'J.K. Rowling', 220, read=false)
addBookToLibrary('Game of Thrones', 'G.R.R. Martin', 694, read=false)

function displayLibrary() {
    if (!myLibrary) {
        alert('Nothing to see hear!')
        return
    }
    for (const book of myLibrary) {
        const bookDiv = document.createElement("div")
        bookDiv.classList.add("book-card");
        bookDiv.textContent = `${book.title}`
        bookDisplay.appendChild("bookDiv")
    }
}



displayLibrary()

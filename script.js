const bookDisplay = document.querySelector(".book-display")
const addBookButton = document.querySelector("#add-book-btn")
const addBookDialog = document.querySelector("#add-book-dialog")
const closeDialogBtn = addBookDialog.querySelector("#close-dialog-btn")

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
        return
    }
    for (const book of myLibrary) {
        const bookDiv = document.createElement("div")
        bookDiv.classList.add("book-card");

        const bookTitle = document.createElement("h3")
        bookTitle.textContent = `${book.title}`

        const bookAuthor = document.createElement("h4")
        bookAuthor.textContent = `by ${book.author}`

        const bookPages = document.createElement("h4")
        bookPages.textContent = `${book.pages} pages`

        const readStatusElement = document.createElement("h4")
        readStatusElement.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;


        bookDiv.append(bookTitle, bookAuthor, bookPages, readStatusElement)

        bookDisplay.appendChild(bookDiv)
    }
}

addBookButton.addEventListener("click", () => {addBookDialog.showModal()})

closeDialogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close()
})

displayLibrary()

const bookDisplay = document.querySelector(".book-display")
const addBookButton = document.querySelector("#add-book-btn")
const addBookDialog = document.querySelector("#add-book-dialog")

const addBookForm = addBookDialog.querySelector("#add-book-form")
const closeDialogBtn = addBookDialog.querySelector("#close-dialog-btn")
const confirmAddBookBtn = addBookDialog.querySelector("#confirm-btn")

const dialogTitle = addBookDialog.querySelector("#book-title")
const dialogAuthor = addBookDialog.querySelector("#author")
const dialogPages = addBookDialog.querySelector("#pages")

const myLibrary = [];


class Book {

    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}

// Default books to show examples
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 293, read=false)
addBookToLibrary('Harry Potter and the Philospher\'s Stone', 'J.K. Rowling', 220, read=false)
addBookToLibrary('Game of Thrones', 'G.R.R. Martin', 694, read=false)

function truncateText(string, strLimit) {
    if (string.length > strLimit) {
        return string.substring(0, strLimit) + "..."
    } else {
        return string
    }
}

function displayLibrary() {
    if (!myLibrary) {
        return
    }
    while (bookDisplay.firstChild) {
        bookDisplay.removeChild(bookDisplay.firstChild)
    }

    for (const book of myLibrary) {
        const bookDiv = document.createElement("div")
        bookDiv.setAttribute("id", `${myLibrary.indexOf(book) + 1}`)
        bookDiv.classList.add("book-card");

        const bookTitle = document.createElement("h3")
        bookTitle.textContent = truncateText(book.title, 39)

        const bookAuthor = document.createElement("h4")
        bookAuthor.textContent = `by ${truncateText(book.author, 15)}`

        const bookPages = document.createElement("h5")
        bookPages.textContent = `${book.pages} pages`

        const readStatusElement = document.createElement("h5")
        readStatusElement.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;

        const btnsDiv = document.createElement("div")
        btnsDiv.classList.add("card-btns");
        const toggleReadStatusBtn = document.createElement("button")
        toggleReadStatusBtn.textContent = `${book.read ? "Not Read": "Read"}`
        toggleReadStatusBtn.addEventListener("click", () => {
            book.read = !book.read;
            displayLibrary()
        })

        const deleteBookBtn = document.createElement("button")
        deleteBookBtn.textContent = "Delete"
        deleteBookBtn.addEventListener("click", () =>
            deleteBook(bookDiv.id))

        btnsDiv.append(toggleReadStatusBtn, deleteBookBtn)


        bookDiv.append(bookTitle, bookAuthor, bookPages, readStatusElement, btnsDiv)

        bookDisplay.appendChild(bookDiv)
    }
}

addBookButton.addEventListener("click", () => {addBookDialog.showModal()})

closeDialogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookDialog.close()
})


displayLibrary()


confirmAddBookBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!addBookForm.checkValidity()) {
        addBookForm.reportValidity();
        return;
    }

    const dialogReadStatus = addBookDialog.querySelector("input[name=read-status]:checked").value


    addBookToLibrary(dialogTitle.value, dialogAuthor.value,
        dialogPages.value, dialogReadStatus === "read")
    displayLibrary()

    addBookDialog.close()
    
    addBookForm.reset()
})

function deleteBook(bookId) {
    const index = parseInt(bookId) - 1
    if (index > -1 && index < myLibrary.length) {
        myLibrary.splice((index), 1)
    }
    displayLibrary()
}
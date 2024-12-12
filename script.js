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
// addBookToLibrary('Game of Thrones', 'G.R.R. Martin', 694, read=false)

function displayLibrary() {
    if (!myLibrary) {
        return
    }
    while (bookDisplay.firstChild) {
        bookDisplay.removeChild(bookDisplay.firstChild)
    }
    for (const book of myLibrary) {
        const bookDiv = document.createElement("div")
        bookDiv.setAttribute("id", `${book.title.replace(/\s+/g, "-").toLowerCase()}`)
        bookDiv.classList.add("book-card");

        const bookTitle = document.createElement("h3")
        bookTitle.textContent = `${book.title}`

        const bookAuthor = document.createElement("h4")
        bookAuthor.textContent = `by ${book.author}`

        const bookPages = document.createElement("h4")
        bookPages.textContent = `${book.pages} pages`

        const readStatusElement = document.createElement("h4")
        readStatusElement.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;

        const btnsDiv = document.createElement("div")
        const toggleReadStatusBtn = document.createElement("button")
        toggleReadStatusBtn.textContent = `${book.read ? "Not Read": "Read"}`
        toggleReadStatusBtn.addEventListener("click", () => {
            book.read ? book.read = false : book.read = true
            displayLibrary(bookDiv)
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
    for (const book of myLibrary){
        if (bookId === book.title.replace(/\s+/g, "-").toLowerCase()){
            let bookIndex = myLibrary.indexOf(book)
            myLibrary.splice(bookIndex, 1)
        }
        displayLibrary()
        }
}
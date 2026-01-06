const createBtn = document.querySelector('.create');
const bookTitle = document.querySelector('#title-input');
const bookAuthor = document.querySelector('#author-input');
const bookYear = document.querySelector('#year-input');
const bookStatus = document.getElementById('book-status');
const card = document.querySelector('.card');
const darkMode = document.querySelector('.dark-mode');


class Book {
    constructor(title, author, year, status, id) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.id = id;
    }
    toggleStatus() {
        this.status = !this.status;
    } 
}



const myLibrary = [
    new Book(
        "A Song of Ice and Fire",
        "George R. R. Martin",
        1998,
        false,
        crypto.randomUUID()
    ),
    new Book(
        "The Hobbit",   
        "J.R.R. Tolkien",
        2002,
        true,
        crypto.randomUUID()
    )
];



function createRemoveBtn() {
    const removeBtnTempalte = document.getElementById('trashCan');
    return removeBtnTempalte.content.cloneNode(true).firstElementChild;
}


function createViewBtn(status) {
    const readBtnTempalte = document.getElementById('openBook');
    const unreadBtnTempalte = document.getElementById('closedBook');
   
    if (status == true) {
        return readBtnTempalte.content.cloneNode(true).firstElementChild;
    } else {
        return unreadBtnTempalte.content.cloneNode(true).firstElementChild;  
    } 
}


function renderViewBtn(button, status) {
    button.innerHTML = "";
    button.append(createViewBtn(status));
}


darkMode.addEventListener('click', () => {
    document.body.classList.toggle('daymode')
})


createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookYear.value, bookStatus.checked);
    console.log(myLibrary);
    showBooksfromArray();
})


function addBookToLibrary(title, author, year, bookStatus) {
    const bookID = crypto.randomUUID();
    const book = new Book(title, author, year, bookStatus, bookID)
    myLibrary.unshift(book)
}



function showBooksfromArray() {
    card.innerHTML = "";
    myLibrary.forEach((b) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard"); 
        
        const up = document.createElement('div');
        up.classList.add('up');

        const middle = document.createElement('div');
        middle.classList.add('middle');

        const bottom = document.createElement('div');
        bottom.classList.add('bottom');


        const removeBookBtn = document.createElement("button");
        removeBookBtn.classList.add('removeBtn');
        removeBookBtn.appendChild(createRemoveBtn())
        removeBookBtn.dataset.id = b.id;
        removeBookBtn.addEventListener('click', () => {
            const removeBookIndex = myLibrary.findIndex(book => book.id === removeBookBtn.dataset.id);
            myLibrary.splice(removeBookIndex, 1);
            bookCard.remove();
        })
        
        const toggleStatusBtn = document.createElement("button");
        toggleStatusBtn.classList.add('toggleStatusBtn');
        renderViewBtn(toggleStatusBtn, b.status);
        toggleStatusBtn.dataset.id = b.id;
        toggleStatusBtn.addEventListener('click', () => {
            b.toggleStatus();
            renderViewBtn(toggleStatusBtn, b.status);
        })

        const titleOutput = document.createElement("div");
        titleOutput.classList.add("title-output");
        titleOutput.textContent = b.title;
        
        const yearOutput = document.createElement("div");
        yearOutput.classList.add("year-output");
        yearOutput.textContent = b.year; 
        
        const authorOutput = document.createElement("div");
        authorOutput.classList.add("author-output");
        authorOutput.textContent = b.author;
        
    
        up.append(removeBookBtn, toggleStatusBtn);
        middle.append(titleOutput);
        bottom.append(yearOutput, authorOutput);
        bookCard.append(up, middle, bottom);
        card.append(bookCard);
    })
    
}



showBooksfromArray();
const createBtn = document.querySelector('.create');
const bookTitle = document.querySelector('#title-input');
const bookAuthor = document.querySelector('#author-input');
const bookYear = document.querySelector('#year-input');
const bookPoster = document.querySelector('#poster');
const bookStatus = document.getElementById('book-status');
const card = document.querySelector('.card');
const darkMode = document.querySelector('.dark-mode');
const totalBooks = document.body.querySelector('.total-books');
const readBooks = document.body.querySelector('.read-books');


class Book {
    constructor(title, author, year, poster, status, id) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.poster = poster;   
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
        "https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg/250px-A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg",
        false,
        crypto.randomUUID()
    ),
    new Book(
        "The Hobbit",
        "J.R.R. Tolkien",
        2002,
        "https://d3525k1ryd2155.cloudfront.net/f/344/103/9780261103344.IN.0.m.jpg",
        true,
        crypto.randomUUID()
    ),
    new Book(
        "Watch Us Fall",
        "Christina Kovac",
        2025,
        // poster,
        false,
        crypto.randomUUID()
    )
];

showTotalBooks();
showReadBooks();

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('daymode')
})


createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookYear.value, bookPoster.value, bookStatus.checked);
    showBooksfromArray();
    
})


function showTotalBooks() {
    totalBooks.textContent = myLibrary.length;
}

function showReadBooks() {
    let alreadyRead = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].status == true) {
            alreadyRead++;
       }
    }
    readBooks.textContent = alreadyRead;
}

function addBookToLibrary(title, author, year, bookStatus) {
    const bookID = crypto.randomUUID();
    const book = new Book(title, author, year, bookStatus, bookID)
    myLibrary.unshift(book);
    showTotalBooks();
    showReadBooks();
}


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



function showBooksfromArray() {
    card.innerHTML = "";
    myLibrary.forEach((b) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard"); 
        
        const bookCover = document.createElement("div");
        bookCover.classList.add('book-cover');
        
        if (b.poster) {
            bookCard.classList.add("has-cover");
            bookCover.style.backgroundImage = `url(${ b.poster })`;
        } else {
            bookCard.classList.add("no-cover");
        }
        

        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info"); 

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
            showTotalBooks();
            showReadBooks();
        })
        
        const toggleStatusBtn = document.createElement("button");
        toggleStatusBtn.classList.add('toggleStatusBtn');
        renderViewBtn(toggleStatusBtn, b.status);
        toggleStatusBtn.dataset.id = b.id;
        toggleStatusBtn.addEventListener('click', () => {
            b.toggleStatus();
            renderViewBtn(toggleStatusBtn, b.status);
            showReadBooks();
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
        bookInfo.append(up, middle, bottom);       
        bookCard.append(bookCover, bookInfo);
        card.append(bookCard);
    })
    
}



showBooksfromArray();
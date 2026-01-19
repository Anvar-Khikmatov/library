const createBtn = document.querySelector('.create');
const resetBtn = document.querySelector('.reset');
const bookTitle = document.querySelector('#title-input');
const bookAuthor = document.querySelector('#author-input');
const bookYear = document.querySelector('#year-input');
const bookPoster = document.querySelector('#poster');
const bookStatus = document.querySelector('#book-status');
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


// First, load from localStorage
let myLibrary = loadLibraryFromStorage();

// If nothing saved, create your ORIGINAL array (exactly as you had it)
if (!myLibrary) {

    myLibrary = [
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
            "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1738430896i/224004039.jpg",
            false,
            crypto.randomUUID()
        ),
        new Book(
            "Days Gone By",
            "Abdulla Qodiriy",
            1926,
            "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1552858234i/44453861.jpg",
            true,
            crypto.randomUUID()
        ),
        new Book(
            "The Alchemist",
            "Paulo Coelho",
            1988,
            "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1483412266i/865.jpg",
            true,
            crypto.randomUUID()
        ),
        new Book(
            "And Then There Were None",
            "Agatha Christie",
            1939,
            "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1638425885i/16299.jpg",
            true,
            crypto.randomUUID()
        ),
        new Book(
            "The Kite Runner",
            "Khaled Hosseini",
            2003,
            "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg",
            false,
            crypto.randomUUID()
        ),
        new Book(
            "The Devil's Dance",
            "Hamid Ismailov",
            2012,
            "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1521203946i/39296289.jpg",
            false,
            crypto.randomUUID()
        )
    ];
    saveLibraryToStorage();
}    





showTotalBooks();
showReadBooks();


darkMode.addEventListener('click', () => {
    document.body.classList.toggle('daymode')
})




if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (confirm('Reset library to default books? This will delete all your added books.')) {
            localStorage.removeItem('myBookLibrary');
            location.reload();
        }
    });
}



createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.body.querySelector("form");

    if(!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    //extra validation of empty string input
    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();
    const year = bookYear.value;

    if (!title || !author || !year) {
        alert('Please fill in all required fields');
        return; 
    }

    const newBook = addBookToLibrary(bookTitle.value, bookAuthor.value, bookYear.value, bookPoster.value, bookStatus.checked);
    createBookCard(newBook);
    form.reset();
})




function addBookToLibrary(title, author, year, bookPoster, bookStatus) {
    const bookID = crypto.randomUUID();
    const book = new Book(title, author, year, bookPoster, bookStatus, bookID)
    myLibrary.push(book);
    saveLibraryToStorage(); 
    showTotalBooks();
    showReadBooks();
    return book;
}



function createBookCard(b){
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
            saveLibraryToStorage(); 
            showTotalBooks();
            showReadBooks();
        })
        
        const toggleStatusBtn = document.createElement("button");
        toggleStatusBtn.classList.add('toggleStatusBtn');
        renderViewBtn(toggleStatusBtn, b.status);
        toggleStatusBtn.dataset.id = b.id;
        toggleStatusBtn.addEventListener('click', () => {
            b.toggleStatus();
            saveLibraryToStorage(); 
            renderViewBtn(toggleStatusBtn, b.status);
            showReadBooks();
        })

        const titleOutput = document.createElement("div");
        titleOutput.classList.add("title-output");
        titleOutput.innerHTML = ` <a class="link" href="https://www.goodreads.com/search?q=${b.title}" target="blank"> ${b.title} </a>`;
        
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
        card.prepend(bookCard);
}



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



function createRemoveBtn() {
    const removeBtnTemplate = document.getElementById('trashCan');
    return removeBtnTemplate.content.cloneNode(true).firstElementChild;
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
      createBookCard(b);  
    })
}


// ===== LOCALSTORAGE FUNCTIONS =====
function saveLibraryToStorage() {
    try {
        localStorage.setItem('myBookLibrary', JSON.stringify(myLibrary));
    } catch (error) {
        console.log('Could not save to localStorage:', error);
    }
}

function loadLibraryFromStorage() {
    try {
        const saved = localStorage.getItem('myBookLibrary');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Convert plain objects back to Book instances
            return parsed.map(book => new Book(
                book.title,
                book.author,
                book.year,
                book.poster,
                book.status,
                book.id || crypto.randomUUID()
            ));
        }
    } catch (error) {
        console.log('Could not load from localStorage:', error);
    }
    return null; // Return null if no data or error
}



showBooksfromArray();
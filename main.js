    document.addEventListener("DOMContentLoaded", function () {
        const bookForm = document.getElementById("bookForm");
        const searchForm = document.getElementById("searchBookForm");
        const incompleteBooksList = document.getElementById("incompleteBookList");
        const completeBooksList = document.getElementById("completeBookList");
        const titleInput = document.getElementById("bookFormTitleInput");
        const authorInput = document.getElementById("bookFormAuthorInput");
        const yearInput = document.getElementById("bookFormYearInput");
        const isCompleteInput = document.getElementById("bookFormIsCompleteCheckbox");
        const modal = document.getElementById("modal");
    
        let books = loadBooks();  
    
        function generateBookId() {
        return Date.now().toString();
        }
    
        function createBookElement(book) {
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("data-bookid", book.id);
        bookDiv.setAttribute("data-testid", "bookItem");
    
        bookDiv.innerHTML = `
            <div class="book-item">
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            </div>
            <div class="action-button">
            <button type="button" data-testid="bookItemIsCompleteButton">
                ${book.isComplete ? "x" : "✔"}
            </button>
            <button type="button" data-testid="bookItemDeleteButton">🗑</button>
            <button type="button" data-testid="bookItemEditButton">🖊</button>
            </div>
        `;
    
        const isCompleteButton = bookDiv.querySelector("[data-testid=bookItemIsCompleteButton]");
        const deleteButton = bookDiv.querySelector("[data-testid=bookItemDeleteButton]");
        const editButton = bookDiv.querySelector("[data-testid=bookItemEditButton]");
    
        // Tombol toggle status buku
        isCompleteButton.addEventListener("click", () => {
            book.isComplete = !book.isComplete;
            saveBooks(books);
            renderBooks();
        });
    
        // Tombol hapus buku
        deleteButton.addEventListener("click", () => {
            if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
            books = books.filter(b => b.id !== book.id);
            saveBooks(books);
            renderBooks();
            }
        });
    
        // Tombol edit buku (menghapus buku dan mengisi form dengan data buku)
        editButton.addEventListener("click", () => {
            titleInput.value = book.title;
            authorInput.value = book.author;
            yearInput.value = book.year;
            isCompleteInput.checked = book.isComplete;
    
            // Hapus buku yang sedang diedit
            books = books.filter(b => b.id !== book.id);
            saveBooks(books);
            renderBooks();
        });
    
        return bookDiv;
        }
    
        function renderBooks() {
        incompleteBooksList.innerHTML = "";
        completeBooksList.innerHTML = "";
    
        if (books.length === 0) {
            incompleteBooksList.innerHTML = "<p>Belum ada buku.</p>";
            completeBooksList.innerHTML = "<p>Belum ada buku.</p>";
        } else {
            books.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                completeBooksList.appendChild(bookElement);
            } else {
                incompleteBooksList.appendChild(bookElement);
            }
            });
        }
        }
    
        // Event listener untuk form penambahan buku (termasuk notifikasi modal)
        bookForm.addEventListener("submit", event => {
        event.preventDefault();
    
        const newBook = {
            id: generateBookId(),
            title: titleInput.value.trim(),
            author: authorInput.value.trim(),
            year: parseInt(yearInput.value.trim(), 10),
            isComplete: isCompleteInput.checked,
        };
    
        if (newBook.title && newBook.author && !isNaN(newBook.year)) {
            books.push(newBook);
            saveBooks(books);
            renderBooks();
            bookForm.reset();
    
            // Tampilkan modal notifikasi
            modal.style.display = "block";
            setTimeout(() => {
            modal.classList.add("hide");
            }, 2500);
            setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove("hide");
            }, 3000);
        } else {
            alert("Masukkan data buku dengan benar, terutama tahun yang harus berupa angka.");
        }
        });
    
        // Event listener untuk pencarian buku berdasarkan judul
        searchForm.addEventListener("submit", event => {
        event.preventDefault();
        const searchTerm = document.getElementById("searchBookTitle").value.toLowerCase().trim();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm)
        );
    
        incompleteBooksList.innerHTML = "";
        completeBooksList.innerHTML = "";
    
        if (filteredBooks.length === 0) {
            incompleteBooksList.innerHTML = "<p>Buku tidak ditemukan.</p>";
            completeBooksList.innerHTML = "<p>Buku tidak ditemukan.</p>";
        } else {
            filteredBooks.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                completeBooksList.appendChild(bookElement);
            } else {
                incompleteBooksList.appendChild(bookElement);
            }
            });
        }
        });
    
        renderBooks();
    });

// menambahkan modal
document.addEventListener("DOMContentLoaded", function () {
    const bookForm = document.getElementById("inputBook");
    const modal = document.getElementById("modal");

    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Tampilkan modal
        modal.style.display = "block";

        // Tambahkan class untuk fade-out sebelum menghilang
        setTimeout(() => {
            modal.classList.add("hide");
        }, 2500);

        // Sembunyikan modal setelah 3 detik
        setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove("hide");
        }, 3000);
    });
});
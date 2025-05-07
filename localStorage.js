// Ambil buku dari localStorage
function loadBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
  }
  
  // Simpan buku ke localStorage
  function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
  }
let books = [
    {id: 1, title: "book_1"},
    {id: 2, title: "book_2"},
    {id: 3, title: "book_3"}
]


// find only the 1st match, if no match === undefine 
const book_find = books.find(b => b.id > 1)
console.log(book_find)

// fitter return as many conditions that matches, if no === []
const book_filter = books.filter(b => b.id > 1)
console.log(book_filter)

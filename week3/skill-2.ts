interface Book {
    title: string,
    pages: number,
}


const describeBook = (book: Book) => {
    console.log (`The book ${book.title} has ${book.pages} pages.`)
}

describeBook({title:"Dune", pages:412});
// interface Book {
//     title: string,
//     pages: number,
// }

// const book = {
//     title:"Dune", 
//     pages:412,
// }
// const describeBook = (book: Book) => {
//     return `The book ${book.title} has ${book.pages} pages.`
// }

// console.log (describeBook(book));


interface Teacher {
    name: string,
    subject: string,
};

interface Employee {
    id: number,
    email: string
};

const schoolTeacher = {
    name:"H", 
    subject:"math", 
    id:333, 
    email:"xxx@lu.se"
};

type SchoolTeacher = Teacher & Employee;

const printTeacherInfo = (schoolTeacher: SchoolTeacher) => {
    return `The ${schoolTeacher.subject} teacher is ${schoolTeacher.name}, her id is ${schoolTeacher.id} and her email is ${schoolTeacher.email}.`
};


console.log (printTeacherInfo(schoolTeacher));
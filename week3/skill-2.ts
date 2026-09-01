// interface Book {
//     title: string,
//     pages: number,
// }


// const describeBook = (book: Book) => {
//     console.log (`The book ${book.title} has ${book.pages} pages.`)
// }

// describeBook({title:"Dune", pages:412});


interface Teacher {
    name: string,
    subject: string,
};

interface Employee {
    id: number,
    email: string
};

type SchoolTeacher = Teacher & Employee;

const printTeacherInfo = (schoolTeacher: SchoolTeacher) => {
    console.log (`The ${schoolTeacher.subject} teacher is ${schoolTeacher.name}, her id is ${schoolTeacher.id} and her email is ${schoolTeacher.email}.`)
};

printTeacherInfo ({
    name:"H", 
    subject:"math", 
    id:333, 
    email:"xxx@lu.se"
})
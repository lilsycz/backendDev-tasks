// //-- skill 1.1 --//
// let studentName:string = "Hsuan";
// let studentAge:number = 26;
// let isEnrolled:boolean = true;

// const describeStudent = (name:string, age:number) => {
//     return `${name} is ${age} years old.`
// };

// console.log (describeStudent(studentName, studentAge));


// //-- skill 1.2--//
// let name1:string = "Hsuan";
// let formal:boolean= false;

// const formatGreeting = (name:string, formal?:boolean) =>{
//     return formal ? `Good day,${name}.` : `Hi ${name}!`;
// };

// console.log (formatGreeting(name1, formal));


// //-- skill 2.1--//
// let ages:number[]=[8,21.56,34,78];
// const agesInFiveYears:number[] = ages.map((n) => n+5);
// console.log(agesInFiveYears);


// //--skill 2.2--//
// let names:string[]=["Max", "Jade", "Josh", "Jake", "Hsuan", "Layla"];
// const shortNames:string[] = names.filter((n)=> n.length <= 4);
// console.log (shortNames);


// //--skill 2.3--//
// let scores:number[]=[32,59,78,2,100,66,97,43];
// const passingScores:number[] = scores.filter (n=>(n>=50));
// const grade:string[] = passingScores.map ((score) => {
//     if (score >= 90)
//         return "A";
//     else if (score>=80)
//         return "B";
//     else if (score>=70)
//         return "C";
//     else if (score>=60)
//         return "D";
//     else
//         return "E";
// });
// const failedStudents:number[] = scores.filter (n=>(n<50));
// console.log (failedStudents.length);
// console.log (grade);


// //--skill 3.1--//
// interface Book {
//     title:string;
//     author:string;
//     pages:number;
// }

// const myBook: Book = {
//     title: "A Brief History of Human",
//     author: "Yuval Noah Harari",
//     pages:55,
// };

// console.log (`I read "${myBook.title}".`);


//--skill 3.2--//
interface Address {
    city:string;
    postalCode?:number;
};

interface Person {
    name:string;
    age:number;
    address:Address;
};

const Person0:Person= {
    name:"Hsuan",
    age:26,
    address:{
        city:"Helsingborg",
        postalCode:25220,
    },
};

const Person1:Person= {
    name:"Mo",
    age:25,
    address:{
        city:"Copenhagen",
    },
};

console.log (`I live in ${Person0.address.city} and my bf lives in ${Person1.address.city}!`);
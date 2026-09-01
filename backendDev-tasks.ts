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


//--skill 2.3--//
let scores:number[]=[32,59,78,2,100,66,97,43];
const passingScores:number[] = scores.filter (n=>(n>=50));
const grade:string[] = passingScores.map ((score) => {
    if (score >= 90)
        return "A";
    else if (score>=80)
        return "B";
    else if (score>=70)
        return "C";
    else if (score>=60)
        return "D";
    else
        return "E";
});
const failedStudents:number[] = scores.filter (n=>(n<50));
console.log (failedStudents.length);
console.log (grade);


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


// //--skill 3.2--//
// interface Address {
//     city:string;
//     postalCode?:number;
// };

// interface Person {
//     name:string;
//     age:number;
//     address:Address;
// };

// const Person0:Person= {
//     name:"Hsuan",
//     age:26,
//     address:{
//         city:"Helsingborg",
//         postalCode:25220,
//     },
// };

// const Person1:Person= {
//     name:"Mo",
//     age:25,
//     address:{
//         city:"Copenhagen",
//     },
// };

// console.log (`I live in ${Person0.address.city} and my bf lives in ${Person1.address.city}!`);


// //--skill 3.3--//
// interface Movie {
//     id:number; title:string; rating:number; genres:string[];
// }

// const movies:Movie[] = [
//     {id:1, title:"The Truman Show", rating:5, genres:["Comedy", "Satire"]},
//     {id:2, title:"Star Wars", rating:5, genres:["Space Opera", "SciFi"]},
//     {id:3, title:"Obsession", rating:4, genres:["Supernatural", "Horror"]},
//     {id:4, title:"Black Mirror", rating:4.5, genres:["Horror", "SciFi"]},
// ];

// const getMoviesByGenre = (movies:Movie[], genres:string): Movie[] => {
//     return movies.filter ((n) => n.genres.includes(genres));
// };

// console.log (getMoviesByGenre(movies,"SciFi").map ((n)=> n.title));


//--skill 4.1 --//
interface Product {
    id:number; name:string; price:number; tags:string[];
};

const products: Product[] = [
    { id: 1, name: "Wireless Mouse", price: 259.9, tags: ["Electronics", "Work"] },
    { id: 2, name: "Yoga Mat", price: 195, tags: ["Fitness", "Home"] },
    { id: 3, name: "Ceramic Mug", price: 1200, tags: ["Kitchen"] },
    { id: 4, name: "Desk Lamp", price: 34.99, tags: ["Work", "Lighting"] },
    { id: 5, name: "MacBook", price: 11000, tags: ["Electronics", "Work"] },
];

const cheaperOnes = (products:Product[]):Product[] => {
    return products.filter((n) => n.price <=1000);
};
console.log (cheaperOnes(products));


// //--skill 4.2--//
// const workProducts = (products:Product[], tags:string):string[] => {
//     return products
//          .filter((n)=>n.tags.includes(tags))
//          .map ((n) => n.name);
// }

// console.log (workProducts(products, "Work"));


// //--skill 4.3--//
// const moreTag = (products:Product[]):string =>{
//     return products
//         .filter((p)=> p.tags.length >1)
//         .map((p)=> `${p.name} ($${p.price})`)
//         .join(" , ")
// }
// console.log(`Multi-tag:`, moreTag(products));
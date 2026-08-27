// //skill 1.1 //
// let studentName:string = "Hsuan";
// let studentAge:number = 26;
// let isEnrolled:boolean = true;

// const describeStudent = (name:string, age:number) => {
//     return `${name} is ${age} years old.`
// };

// console.log (describeStudent(studentName, studentAge));


// //skill 1.2//
// let name1:string = "Hsuan";
// let formal:boolean= false;

// const formatGreeting = (name:string, formal?:boolean) =>{
//     return formal ? `Good day,${name}.` : `Hi ${name}!`;
// };

// console.log (formatGreeting(name1, formal));

//skill 2.1//

let ages:number[]=[8,21.56,34,78];
const agesInFiveYears:number[] = ages.map((n) => n+5);
console.log(agesInFiveYears);

// let studentName:string = "Hsuan";
// let studentAge:number = 26;
// let isEnrolled:boolean = true;

// const describeStudent = (name:string, age:number) => {
//     return `${name} is ${age} years old.`
// }

// console.log (describeStudent(studentName, studentAge));


let name1:string = "Hsuan";
let formal:boolean= false;

const formatGreeting = (name:string, formal?:boolean) =>{
    return formal ? `Good day,${name}.` : `Hi ${name}!`;
}

console.log (formatGreeting(name1, formal))
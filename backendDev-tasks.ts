let studentName:string = "Hsuan";
let studentAge:number = 26;
let isEnrolled:boolean = true;

const describeStudent = (name:string, age:number) => {
    return `${name} is ${age} years old.`
}

console.log (describeStudent(studentName, studentAge));
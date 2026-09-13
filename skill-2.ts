/*
Before
After
Time's up!
Countdown finished.

it runs the things inside countdown function first, then runs the outsides ones.
*/

const countdown = (seconds: number, callback: ()=>void) => {
    setTimeout(() => {
        console.log (`Time's up!`);
        callback();
    }, seconds*1000);
    
};

console.log (`Before`);
countdown(3,()=> console.log(`Countdown finished.`));
console.log (`After`);
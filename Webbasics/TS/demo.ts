let a:number = 10;
let b:number = 20;
let Name: string = "John Doe";

function add(x:number, y:number):number {
    return x + y;
}


let result = add(a, b);
console.log(`The sum of ${a} and ${b} is ${result}`);
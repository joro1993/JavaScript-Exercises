//variable kelvin with value of 293
const kelvin = 293;
//variable celsius
 const celsius = kelvin - 273;
//variable fahrenheit
 let fahrenheit = celsius * (9/5) + 32;
//math floor fahrenheit
 fahrenheit = Math.floor(fahrenheit);

 let newton = celsius *(33/100)
 newton = Math.floor(newton);

 document.write(`The Temperature is ${kelvin} degrees in Kelvin.<br>`);
 document.write(`The Temperature is ${fahrenheit} degrees in Fahrenheit.<br>`);
 document.write(`The Temperature is ${celsius} degrees in Celsius.<br>`);
 document.write(`The Temperature is ${newton} degrees in Newton.<br>`);
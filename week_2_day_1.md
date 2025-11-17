# README

**Ejercicio**: Crea un programa que demuestre las diferencias entre var, let y const en diferentes contextos (global, función, bloque). Incluye ejemplos de hoisting y TDZ.

```sh
# Crear directorio para práctica
mkdir javascript-fundamentos
cd javascript-fundamentos

# Crear archivo de práctica
touch app.js

# Ejecutar con Node.js
node app.js
```

```javascript
var username = "Felipe Gutiérrez";
const age = 95;
console.log(`My name is ${username}`);
console.log(`My current age is ${age}`);

greeting(username, age);

function greeting(n = "John", a) {
  a = age;
  username = n;
  let isSingle = true;

  if (n === "Felipe Gutiérrez") {
    isSingle = false;
    console.log(`Hello my name is ${username}, I'm ${a} old, and I'm ${isSingle}`);
  }
  username = "Tom Hardy";
  console.log(`Hello my name is ${username}, I'm ${a} old, and I'm ${isSingle}`);
}

greeting();

// console.log(`Currently I'm ${isSingle ? "Single" : "Married"}!`); ❌ ReferenceError

function tdzDemonstration() {
  try {
    console.log("Accessing before declaration:", city);
  } catch (error) {
    console.error(`ERROR: ${error.name} - ${error.message}`);
    console.log("-----------------------------------------");
  }

  let city = "Santiago";

  console.log("Accessing after declaration:", city);
}

tdzDemonstration();
```

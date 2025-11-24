# README

**Ejercicio**: Crea un sistema de gestión de tareas (todo list) usando closures para mantener el estado privado. Implementa funciones para agregar tareas, marcar como completadas, filtrar por estado, y obtener estadísticas. Usa arrow functions donde sea apropiado y parámetros avanzados.

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
console.log("TODO List");
console.log("\n------------------------------------");

function createTodo() {
  let items = [];
  const getStatusMsn = (isDone) => (isDone ? "Completado" : "Pendiente");

  return {
    addItem: function (item, isDone = false) {
      items.push({ item, isDone });
      console.log(`Agregado: ${item}, Estado: ${getStatusMsn(isDone)}`);
    },

    removeItem: function (item) {
      const index = items.findIndex((i) => i.item === item);

      if (index !== -1) {
        const todoItem = items[index];

        if (todoItem.isDone) {
          items.splice(index, 1);
          console.log(`Removido: ${item} (Completado)`);
        } else {
          console.log(`No se puede remover: ${item}. La tarea está Pendiente.`);
        }
      } else {
        console.log(`Advertencia: La tarea ${item} no se encuentra en la lista.`);
      }
    },

    getItems: () => [...items],

    getItemsByState: (state) => [...items].filter((i) => i.isDone === state),

    changeItemsState: (item) => {
      const todoItem = items.find((i) => i.item === item);
      if (todoItem) {
        todoItem.isDone = !todoItem.isDone;
        console.log(`Cambiando el estado de: ${item} a ${todoItem.isDone}`);
      }
    },
  };
}

const todo = createTodo();
const isDoneStatus = true;

todo.addItem("Buy milk");
todo.addItem("Buy coffee");
todo.addItem("Do laundry", true);
todo.addItem("Study Javascript", true);
todo.addItem("Study English", true);
todo.addItem("Buy a new Laptop");

console.log("\n------------------------------------");
todo.removeItem("Buy milk");

console.log("\n------------------------------------");
todo.removeItem("Buy coffee");
todo.changeItemsState("Buy coffee");
todo.removeItem("Buy coffee");

console.log("\n------------------------------------");
console.log(`Lista de tareas: ${JSON.stringify(todo.getItems(), null, 2)}`);

console.log("\n------------------------------------");
console.log(
  `Filtradas por estado - ${isDoneStatus} : ${JSON.stringify(todo.getItemsByState(isDoneStatus), null, 2)}`,
);
```

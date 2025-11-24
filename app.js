console.log("=== SISTEMA DE GESTIÓN DE BIBLIOTECA ===\n");

// Base de datos de libros
const libros = [
  {
    id: 1,
    titulo: "JavaScript: The Good Parts",
    autor: "Douglas Crockford",
    genero: "Programación",
    disponible: true,
  },
  {
    id: 2,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    genero: "Programación",
    disponible: false,
  },
  {
    id: 3,
    titulo: "The Pragmatic Programmer",
    autor: "Andrew Hunt",
    genero: "Programación",
    disponible: true,
  },
  { id: 4, titulo: "1984", autor: "George Orwell", genero: "Ficción", disponible: true },
  {
    id: 5,
    titulo: "To Kill a Mockingbird",
    autor: "Harper Lee",
    genero: "Ficción",
    disponible: false,
  },
];

// Base de datos de Usuarios y sus historiales de préstamo
const usuarios = [
  {
    id: 101,
    nombre: "Ana Martínez",
    historial: [
      {
        libroId: 4,
        fechaPrestamo: "2025-11-10",
        fechaDevolucion: "2025-11-20",
      },
      {
        libroId: 1,
        fechaPrestamo: "2025-11-22",
        fechaDevolucion: null,
      },
    ],
  },
  {
    id: 102,
    nombre: "Pedro Gómez",
    historial: [
      {
        libroId: 2,
        fechaPrestamo: "2025-11-01",
        fechaDevolucion: null,
      },
      {
        libroId: 3,
        fechaPrestamo: "2025-11-15",
        fechaDevolucion: "2025-11-20",
      },
    ],
  },
  {
    id: 103,
    nombre: "Sofía Hernández",
    historial: [
      {
        libroId: 5,
        fechaPrestamo: "2025-10-15",
        fechaDevolucion: "2025-11-05",
      },
    ],
  },
  {
    id: 104,
    nombre: "Javier López",
    historial: [
      {
        libroId: 3,
        fechaPrestamo: "2025-10-01",
        fechaDevolucion: "2025-10-25",
      },
      {
        libroId: 4,
        fechaPrestamo: "2025-10-28",
        fechaDevolucion: "2025-11-05",
      },
      {
        libroId: 2,
        fechaPrestamo: "2025-11-20",
        fechaDevolucion: "2025-11-24",
      },
    ],
  },
  {
    id: 105,
    nombre: "Elena Torres",
    historial: [],
  },
];

// Sistema de gestión
const biblioteca = {
  // Obtener libros disponibles
  obtenerDisponibles() {
    return libros.filter((libro) => libro.disponible);
  },

  // Buscar libros por título o autor
  buscar(criterio) {
    const termino = criterio.toLowerCase();
    return libros.filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(termino) || libro.autor.toLowerCase().includes(termino),
    );
  },

  // Prestar libro
  prestar(libroId, usuarioId) {
    const libro = libros.find((l) => l.id === libroId);
    const usuario = usuarios.find((u) => u.id === usuarioId);

    if (!libro) return { exito: false, mensaje: "Libro no encontrado" };
    if (!usuario) return { exito: false, mensaje: "Usuario no encontrado" };
    if (!libro.disponible) return { exito: false, mensaje: "Libro no disponible" };

    libro.disponible = false;

    const nuevoPrestamo = {
      libroId,
      fechaPrestamo: this.obtenerFechaActual(),
      fechaDevolucion: null,
    };

    usuario.historial.push(nuevoPrestamo);

    return {
      exito: true,
      mensaje: `Libro "${libro.titulo}" prestado exitosamente a ${usuario.nombre}`,
    };
  },

  // Devolver libro
  devolver(libroId, usuarioId) {
    const libro = libros.find((l) => l.id === libroId);
    const usuario = usuarios.find((u) => u.id === usuarioId);

    if (!libro) return { exito: false, mensaje: "Libro no encontrado" };
    if (!usuario) return { exito: false, mensaje: "Usuario no encontrado" };
    if (libro.disponible) return { exito: false, mensaje: "Este libro ya está disponible" };

    const prestamoActivo = usuario.historial.find(
      (prestamo) => prestamo.libroId === libroId && prestamo.fechaDevolucion === null,
    );

    if (!prestamoActivo) {
      return {
        exito: false,
        mensaje: `No se encontró un préstamo activo del libro "${libro.titulo}" para el usuario ${usuario.nombre}`,
      };
    }

    libro.disponible = true;

    prestamoActivo.fechaDevolucion = this.obtenerFechaActual();

    return {
      exito: true,
      mensaje: `Libro "${libro.titulo}" devuelto exitosamente por ${usuario.nombre}`,
    };
  },

  // Estadísticas
  obtenerEstadisticas() {
    const total = libros.length;
    const disponibles = libros.filter((l) => l.disponible).length;
    const prestados = total - disponibles;

    // Agrupar por género usando reduce
    const porGenero = libros.reduce((acc, libro) => {
      acc[libro.genero] = (acc[libro.genero] || 0) + 1;
      return acc;
    }, {});

    return { total, disponibles, prestados, porGenero };
  },

  obtenerFechaActual() {
    return new Date().toISOString().split("T")[0];
  },

  //TODO: búsqueda avanzada por múltiples criterios
  busquedaAvanzada(criterio, termino) {
    const categoria = criterio.toLowerCase();
    let resultados = [];

    switch (categoria) {
      case "titulo":
        console.log("Buscando libros cuyo título contenga:", termino);
        resultados = libros.filter((libro) =>
          libro.titulo.toLowerCase().includes(termino.toLowerCase()),
        );
        break;

      case "autor":
        console.log("Buscando libros escritos por:", termino);
        resultados = libros.filter((libro) =>
          libro.autor.toLowerCase().includes(termino.toLowerCase()),
        );
        break;

      case "genero":
        console.log("Buscando libros del género:", termino);
        resultados = libros.filter((libro) =>
          libro.genero.toLowerCase().includes(termino.toLowerCase()),
        );
        break;

      case "disponibilidad":
        const estaDisponible = termino === true || String(termino).toLocaleLowerCase() === "true";
        console.log(`Buscando libros que ${estaDisponible ? "estén" : "NO estén"} disponibles.`);
        resultados = libros.filter((libro) => libro.disponible === estaDisponible);
        break;

      default:
        console.error(
          `¡Categoría de búsqueda no reconocida: "${categoria}". Por favor, usa 'titulo', 'autor', 'genero' o 'disponibilidad'.`,
        );
        return [];
    }

    return resultados;
  },
};

const resultadoTitulo = biblioteca.busquedaAvanzada("titulo", "JavaScript: The Good Parts");
const resultadoAutor = biblioteca.busquedaAvanzada("Autor", "Harper Lee");
const resultadoGenero = biblioteca.busquedaAvanzada("genero", "Programación");
const resultadoDisponible = biblioteca.busquedaAvanzada("disponibilidad", true);

console.log("Resultado por Titulo:", resultadoTitulo);
console.log("Resultado por Autor:", resultadoAutor);
console.log("Resultado por Género:", resultadoGenero);
console.log("Resultado por Disponibilidad:", resultadoDisponible);

// Demostraciones prácticas
console.log("📚 LIBROS DISPONIBLES:");
biblioteca.obtenerDisponibles().forEach(({ titulo, autor }) => {
  console.log(`- "${titulo}" por ${autor}`);
});

console.log("\n🔍 BÚSQUEDA 'JavaScript':");
biblioteca.buscar("JavaScript").forEach(({ titulo, autor }) => {
  console.log(`- "${titulo}" por ${autor}`);
});

console.log("\n📊 ESTADÍSTICAS:");
const stats = biblioteca.obtenerEstadisticas();
console.log(`Total de libros: ${stats.total}`);
console.log(`Disponibles: ${stats.disponibles}`);
console.log(`Prestados: ${stats.prestados}`);
console.log("Por género:", stats.porGenero);

console.log("\n📖 OPERACIONES DE PRÉSTAMO:");
console.log(biblioteca.prestar(1).mensaje);
console.log(biblioteca.prestar(1).mensaje); // Intento fallido
console.log(biblioteca.devolver(1).mensaje);

console.log("\n=== DEMOSTRACIÓN DE DESTRUCTURING ===\n");

// Función que usa destructuring extensivamente
function procesarPrestamo({ id, titulo, autor, disponible }) {
  if (!disponible) {
    return `❌ "${titulo}" no está disponible`;
  }

  const resultado = biblioteca.prestar(id);
  return resultado.exito ? `✅ ${resultado.mensaje}` : `❌ ${resultado.mensaje}`;
}

// Procesar múltiples libros con destructuring
const librosParaProcesar = [
  { id: 1, titulo: "JavaScript: The Good Parts", autor: "Douglas Crockford", disponible: true },
  { id: 4, titulo: "1984", autor: "George Orwell", disponible: true },
];

librosParaProcesar.forEach((libro) => {
  console.log(procesarPrestamo(libro));
});

// Destructuring en bucles
console.log("\n📋 LISTADO DE LIBROS CON DESTRUCTURING:");
for (const { titulo, autor, genero, disponible } of libros) {
  const estado = disponible ? "✅ Disponible" : "❌ Prestado";
  console.log(`${titulo} - ${autor} (${genero}) ${estado}`);
}

// Estadísticas avanzadas usando métodos modernos
console.log("\n🎯 ANÁLISIS AVANZADO:");
const librosPorGenero = libros.reduce((acc, { genero, disponible }) => {
  if (!acc[genero]) acc[genero] = { total: 0, disponibles: 0 };
  acc[genero].total++;
  if (disponible) acc[genero].disponibles++;
  return acc;
}, {});

Object.entries(librosPorGenero).forEach(([genero, stats]) => {
  console.log(`${genero}: ${stats.disponibles}/${stats.total} disponibles`);
});

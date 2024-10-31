// Clase Nodo para representar cada coche en la cola
class Nodo {
    constructor(data) {
        this.data = data; // Datos del coche
        this.next = null; // Apuntador al siguiente nodo
    }
}

// Clase Cola para manejar la lista de coches
class Cola {
    constructor() {
        this.front = null; // Apuntador al frente de la cola
        this.rear = null; // Apuntador al final de la cola
        this.size = 0; // Tamaño de la cola
    }

    // Método para agregar un coche a la cola
    enqueue(data) {
        const newNode = new Nodo(data);
        if (this.isEmpty()) {
            this.front = newNode; // Si la cola está vacía, el nuevo nodo es tanto el frente como el final
            this.rear = newNode;
        } else {
            this.rear.next = newNode; // El actual final apunta al nuevo nodo
            this.rear = newNode; // Actualizar el final
        }
        this.size++;
    }

    // Método para eliminar un coche de la cola
    dequeue() {
        if (this.isEmpty()) return null; // Si la cola está vacía, no hay nada que eliminar
        const removedNode = this.front; // Guardar el nodo que se va a eliminar
        this.front = this.front.next; // Mover el frente al siguiente nodo
        if (this.front === null) {
            this.rear = null; // Si la cola queda vacía, también actualizar el final
        }
        this.size--;
        return removedNode.data; // Retornar los datos del coche eliminado
    }

    // Método para verificar si la cola está vacía
    isEmpty() {
        return this.front === null; // Retornar verdadero si no hay coches
    }

    // Método para obtener el tamaño de la cola
    getSize() {
        return this.size;
    }

    // Método para obtener todos los coches en la cola
    getCars() {
        const cars = [];
        let current = this.front;
        while (current) {
            cars.push(current.data); // Almacenar los datos del coche en un array
            current = current.next; // Avanzar al siguiente nodo
        }
        return cars; // Retornar todos los coches
    }
}

// Instancia de la cola de coches
const colaCoches = new Cola();

// Contadores
let paintedCount = 0; // Contador de coches pintados
let totalTime = 0; // Tiempo total de juego
let encolarInterval = 20000; // Intervalo de encolado inicial

// Función para generar un color aleatorio para un coche
function generarColorAleatorio() {
    const coloresDisponibles = ["naranja", "rojo", "verde", "azul", "amarillo"];
    const indiceAleatorio = Math.floor(Math.random() * coloresDisponibles.length);
    return coloresDisponibles[indiceAleatorio];
}

// Función para encolar un coche cada X segundos
function encolarCoche() {
    if (colaCoches.getSize() < 5) { // Limitar a 5 coches en la cola
        const coche = {
            number: colaCoches.getSize() + 1,
            color: generarColorAleatorio(),
            pintado: false, // Estado inicial
        };
        colaCoches.enqueue(coche);
        mostrarCoches(); // Mostrar los coches actuales en la cola
    } else {
        alert("La cola ha alcanzado su límite de 5 coches.");
    }
}

// Función para mostrar los coches en la pantalla
function mostrarCoches() {
    const carQueue = document.getElementById('carQueue');
    carQueue.innerHTML = ''; // Limpiar la lista anterior
    const cars = colaCoches.getCars(); // Obtener los coches en la cola

    cars.forEach((car) => {
        const li = document.createElement('li');
        li.textContent = `Coche No. ${car.number} - Color: ${car.color} - Estado: ${car.pintado ? 'Atendido' : 'Enfilándose'}`; // Mostrar información del coche
        carQueue.appendChild(li); // Añadir a la lista
    });
    
    document.getElementById('carCount').textContent = paintedCount; // Actualizar contador de coches pintados
    document.getElementById('totalTime').textContent = totalTime; // Actualizar tiempo total
}

// Función para pintar el coche
function pintarCarro() {
    // Obtener el primer coche en la cola
    let cocheFrente = colaCoches.front;
    while (cocheFrente && cocheFrente.data.pintado) {
        // Pasar al siguiente coche si ya ha sido atendido
        cocheFrente = cocheFrente.next;
    }

    // Comprobar si hay un coche para pintar
    if (!cocheFrente) {
        alert("No hay coches en la cola para pintar.");
        return;
    }

    // Obtener el coche actual
    const cocheActual = cocheFrente.data;
    // Pintar el coche con el color seleccionado
    cocheActual.color = document.getElementById('colorSelect').value; // Establecer el color seleccionado
    cocheActual.pintado = true; // Marcar como atendido
    paintedCount++; // Incrementar el contador de coches pintados
    totalTime += 20; // Agregar tiempo al total

    // Mostrar el coche pintado
    showCarPainted(cocheActual);

    // Eliminar el coche atendido de la cola
    colaCoches.dequeue(); // Eliminar el coche atendido de la cola

    // Actualizar la visualización
    mostrarCoches();
}

// Función para mostrar el coche pintado
function showCarPainted(car) {
    const carImage = document.getElementById('carImage');
    switch (car.color) {
        case 'naranja':
            carImage.src = '../carritoOrange.png';
            break;
        case 'rojo':
            carImage.src = '../carritoRed.png';
            break;
        case 'verde':
            carImage.src = '../carritoGreen.png';
            break;
        case 'azul':
            carImage.src = '../carritoBlue.png';
            break;
        case 'amarillo':
            carImage.src = '../carritoYellow.png';
            break;
        default:
            carImage.src = '../carritoWhite.png'; // Por defecto
    }
    alert(`Coche No. ${car.number} pintado de color ${car.color}.`); // Mensaje de confirmación
}

// Agregar coches a la cola cada 20 segundos (simulación)
let encolarTimeout = setInterval(encolarCoche, encolarInterval); // Llamar a la función cada 20 segundos

// Event listener para el botón de pintar
document.getElementById('paintCarButton').addEventListener('click', pintarCarro);

// Mostrar la cola de coches al cargar la página
mostrarCoches(); // Mostrar la cola al iniciar

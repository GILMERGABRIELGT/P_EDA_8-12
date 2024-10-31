// Clase Nodo para representar cada coche en la cola
class Nodo {
    constructor(data) {
        this.data = data; // Datos del coche
        this.next = null; // Apuntador al siguiente nodo
        this.prev = null; // Apuntador al nodo anterior
    }
}

// Clase Cola para manejar la lista de coches
class ColaCircularDoble {
    constructor() {
        this.front = null; // Apuntador al frente de la cola
        this.rear = null; // Apuntador al final de la cola
        this.size = 0; // Tamaño de la cola
    }

    // Método para agregar un coche a la cola
    enqueue(placas, propietario) {
        const newNode = new Nodo({ placas, propietario, horaEntrada: new Date() });
        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
            newNode.next = newNode; // Circular
            newNode.prev = newNode; // Circular
        } else {
            newNode.next = this.front; // Nuevo nodo apunta al frente
            newNode.prev = this.rear; // Nuevo nodo apunta al final
            this.rear.next = newNode; // El nodo anterior apunta al nuevo
            this.front.prev = newNode; // El nuevo nodo apunta al frente
            this.rear = newNode; // Actualizar el final
        }
        this.size++;
    }

    // Método para eliminar un coche de la cola
    dequeue() {
        if (this.isEmpty()) return null;
        const removedNode = this.front; // Guardar el nodo que se va a eliminar
        if (this.size === 1) {
            this.front = null;
            this.rear = null; // Si queda vacío
        } else {
            this.front = this.front.next; // Mover el frente al siguiente nodo
            this.rear.next = this.front; // Actualizar el final para apuntar al nuevo frente
            this.front.prev = this.rear; // Actualizar el anterior del nuevo frente
        }
        this.size--;
        return removedNode.data; // Retornar los datos del coche eliminado
    }

    // Método para verificar si la cola está vacía
    isEmpty() {
        return this.front === null;
    }

    // Método para obtener el tamaño de la cola
    getSize() {
        return this.size;
    }

    // Método para verificar si las placas ya existen
    exists(placas, propietario) {
        let current = this.front;
        while (current) {
            if (current.data.placas === placas || current.data.propietario === propietario) {
                return true; // Ya existe
            }
            current = current.next;
            if (current === this.front) break; // Para evitar bucle infinito en cola circular
        }
        return false; // No existe
    }
}

// Instancia de la cola de coches
const parkingLot = new ColaCircularDoble();

// Función para manejar la entrada de autos
function entradaAuto() {
    const placas = document.getElementById('placas').value;
    const propietario = document.getElementById('propietario').value;

    if (!placas || !propietario) {
        alert("Por favor, ingresa las placas y el nombre del propietario.");
        return;
    }

    // Verificar si las placas o el propietario ya existen
    if (parkingLot.exists(placas, propietario)) {
        alert("El auto con estas placas o el propietario ya existe en el estacionamiento.");
        return;
    }

    parkingLot.enqueue(placas, propietario);
    document.getElementById('placas').value = ''; // Limpiar el campo
    document.getElementById('propietario').value = ''; // Limpiar el campo
    document.getElementById('numeroAutos').textContent = parkingLot.getSize(); // Actualizar el número de autos
    actualizarTabla(); // Actualizar la tabla
    alert(`Auto con placas ${placas} ingresado. Propietario: ${propietario}`);
}

// Función para manejar la salida de autos
function salidaAuto() {
    if (parkingLot.isEmpty()) {
        alert("El estacionamiento está vacío.");
        return;
    }

    const auto = parkingLot.dequeue(); // Obtener el auto que sale
    const horaSalida = new Date(); // Hora de salida
    const tiempoEstacionamiento = Math.round((horaSalida - auto.horaEntrada) / 1000); // Calcular tiempo en segundos
    const costo = Math.ceil(tiempoEstacionamiento / 2); // Costo en pesos, $2 por cada 2 segundos

    alert(`Auto con placas ${auto.placas} salió. \nPropietario: ${auto.propietario} \nHora de entrada: ${auto.horaEntrada.toLocaleTimeString()} \nHora de salida: ${horaSalida.toLocaleTimeString()} \nTiempo total: ${tiempoEstacionamiento} segundos \nCosto: $${costo}`);
    document.getElementById('numeroAutos').textContent = parkingLot.getSize(); // Actualizar el número de autos
    actualizarTabla(); // Actualizar la tabla
}

// Función para actualizar la tabla de autos
function actualizarTabla() {
    const tablaAutos = document.getElementById('tablaAutos');
    tablaAutos.innerHTML = ''; // Limpiar la tabla anterior
    let current = parkingLot.front;

    if (current) {
        do {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${current.data.placas}</td>
                <td>${current.data.propietario}</td>
                <td>${current.data.horaEntrada.toLocaleTimeString()}</td>
            `;
            tablaAutos.appendChild(row);
            current = current.next; // Avanzar al siguiente nodo
        } while (current !== parkingLot.front); // Mantenerse dentro de la cola circular
    }
}

// Asignar eventos a los botones
document.getElementById('entradaButton').addEventListener('click', entradaAuto);
document.getElementById('salidaButton').addEventListener('click', salidaAuto);

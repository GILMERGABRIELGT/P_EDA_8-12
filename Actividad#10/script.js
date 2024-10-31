// Clase Nodo para representar cada cliente
class Nodo {
    constructor(data) {
        this.data = data; // Datos del cliente
        this.next = null; // Apuntador al siguiente nodo
    }
}

// Clase Cola para manejar la lista de clientes
class Cola {
    constructor() {
        this.front = null; // Apuntador al frente de la cola
        this.rear = null; // Apuntador al final de la cola
        this.size = 0; // Tamaño de la cola
    }

    // Método para agregar un cliente a la cola
    enqueue(data) {
        if (this.size >= 10) { // Limitar la cola a un máximo de 10 clientes
            alert('La cola está llena. No se pueden agregar más clientes.');
            return;
        }
        const newNode = new Nodo(data);
        if (this.isEmpty()) {
            this.front = newNode; // Si la cola está vacía, el nuevo nodo es tanto el frente como el final
            this.rear = newNode;
        } else {
            this.rear.next = newNode; // El actual final apunta al nuevo nodo
            this.rear = newNode; // Actualizar el final
        }
        this.size++; // Incrementar el tamaño de la cola
    }

    // Método para eliminar un cliente de la cola
    dequeue() {
        if (this.isEmpty()) return null; // Si la cola está vacía, no hay nada que eliminar
        const removedNode = this.front; // Guardar el nodo que se va a eliminar
        this.front = this.front.next; // Mover el frente al siguiente nodo
        if (this.front === null) {
            this.rear = null; // Si la cola queda vacía, también actualizar el final
        }
        this.size--; // Decrementar el tamaño de la cola
        return removedNode.data; // Retornar los datos del cliente eliminado
    }

    // Método para verificar si la cola está vacía
    isEmpty() {
        return this.front === null; // Retornar verdadero si no hay clientes
    }

    // Método para obtener todos los clientes en la cola
    getClients() {
        const clients = [];
        let current = this.front;
        while (current) {
            clients.push(current.data); // Almacenar los datos del cliente en un array
            current = current.next; // Avanzar al siguiente nodo
        }
        return clients; // Retornar todos los clientes
    }
}

// Crear una instancia de Cola
const colaClientes = new Cola();

// Event listener para el formulario de agregar clientes
document.getElementById('clientForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    const clientName = document.getElementById('clientName').value;
    const transactionType = document.getElementById('transactionType').value;
    const arrivalTime = new Date(); // Obtener la hora actual
    const clientData = {
        name: clientName,
        transaction: transactionType,
        arrival: arrivalTime,
    };
    colaClientes.enqueue(clientData); // Agregar cliente a la cola
    document.getElementById('clientForm').reset(); // Limpiar el formulario

    // Mostrar clientes en la cola
    mostrarClientes(); // Llama a la función para mostrar los clientes
});

// Función para mostrar los clientes en la lista
function mostrarClientes() {
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = ''; // Limpiar la lista anterior
    const clients = colaClientes.getClients(); // Obtener todos los clientes de la cola
    clients.forEach((client, index) => {
        const li = document.createElement('li');
        li.textContent = `Cliente ${index + 1}: ${client.name} - Tipo de Movimiento: ${client.transaction} - Hora de llegada: ${client.arrival.toLocaleTimeString()}`; // Mostrar detalles del cliente
        clientList.appendChild(li); // Añadir el cliente a la lista
    });
}

// Event listener para el botón de atender cliente
document.getElementById('serveClientButton').addEventListener('click', () => {
    const servedClient = colaClientes.dequeue(); // Atender al primer cliente en la cola
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = ''; // Limpiar la lista anterior
    if (servedClient) {
        // Mostrar mensaje modal con el tiempo de espera
        const currentTime = new Date(); // Obtener la hora actual
        const waitTime = Math.round((currentTime - servedClient.arrival) / 1000); // Calcular el tiempo de espera en segundos
        alert(`Cliente atendido: ${servedClient.name} - Tiempo de espera en la cola: ${waitTime} segundos`); // Mostrar el tiempo de espera en un modal
    }

    // Mostrar todos los clientes restantes en la cola
    mostrarClientes(); // Actualizar la lista de clientes restantes
});

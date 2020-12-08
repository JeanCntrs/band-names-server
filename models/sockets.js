const BandList = require('./bandList');

class Sockets {
    constructor(io) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('client connected')

            // Emitir al cliente conectado, todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());
            
            // Escuchar evento: mensaje-to-server
            /* socket.on('mensaje-to-server', (data) => {
                console.log(data);
                this.io.emit('mensaje-from-server', data);
            });*/
        }); 
    }
}

module.exports = Sockets;
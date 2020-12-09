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

            socket.on('increase-votes', id => {
                this.bandList.increaseVotes(id);
                // socket : only emit to client that triggers the event
                // io : emit to all client
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('remove-band', id => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('change-name', ({ id, newName }) => {
                this.bandList.changeName(id, newName);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            socket.on('add-band', ({ name }) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

        });
    }
}

module.exports = Sockets;
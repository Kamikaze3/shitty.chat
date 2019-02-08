const WSServer = require('websocket').server;
const uuidv4 = require('uuid/v4');
const http = require('http');

const SECONDS_TO_WAIT_FOR_MATCH = 1;
const PORT = 1337;

const httpServer = http.createServer((request, response) => {});
httpServer.listen(PORT, () => {
    log(`Connection listening on port ${PORT}`);
});




const options = {
    httpServer: httpServer,
};
const server = new WSServer(options);
const usersWithoutMatch = [];

server.on('request', request => {
log("Incoming request");
    const connection = request.accept(null, request.origin);
    const user = {
        id: uuidv4(),
        connection: connection,
    };
    usersWithoutMatch.push(user);
    const dummy = {
        id: uuidv4(),
        connection: connection,
    };
    usersWithoutMatch.push(dummy);

    findMatch(user.id).then(match => {
        connection.on('message', (message) => {
            log("Sending message")
            match.connection.send(message);
        });
    });

     connection.on('close', () => {
        log("Connection closed");
     });

});

const findMatch = ownUserID => {
    return new Promise(resolve => {
        const availableUsers = usersWithoutMatch.filter(u => u.id != ownUserID);

        setInterval(() => {
            if (availableUsers.length > 0) {
                const index = randomInt(availableUsers.length - 1);
                const match = availableUsers[index];
                usersWithoutMatch.splice(index, 1);
                resolve(match);
            }
        }, SECONDS_TO_WAIT_FOR_MATCH * 1000);
    });
};

const randomInt = max => Math.floor(Math.random() * Math.floor(max));

const log = message => console.log(`${new Date()} - ${message}`);

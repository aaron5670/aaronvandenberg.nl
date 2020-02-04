import {HOST_NAME, PORT} from "../../config";

const serverHostname = `${HOST_NAME}:${PORT}`;
let theSocket;

//ToDo: WebpackError: ReferenceError: WebSocket is not defined
export function openWebSocket() {
    // if (theSocket) {
    //     theSocket.onerror = null;
    //     theSocket.onopen = null;
    //     theSocket.onclose = null;
    //     theSocket.close();
    // }
    // theSocket = new WebSocket(`wss://${serverHostname}`);
    //
    // // this method is not in the official API, but it's very useful.
    // theSocket.sendJSON = function (data) {
    //     this.send(JSON.stringify(data));
    // };
    //
    // theSocket.onmessage = function (eventInfo) {
    //     var message = JSON.parse(eventInfo.data);
    //     console.log(`People online: ${message.currentConnections}`);
    // };

    return theSocket;
}

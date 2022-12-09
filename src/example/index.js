const xmlRequest = require("../xmlRequest");
const eSocket = require("../eSocketClient");
const _ = require("lodash");

const requestData = new xmlRequest();
let data = requestData.initialization(12700001);

const dataHandler = (xml) => {
   console.log(xml);
};

const socket = new eSocket(dataHandler);

socket.connect().then(() => {
   console.log("CONNECTED");
   socket.tcpWrite(data).then(() => {
      console.log("SENT");
   });
});

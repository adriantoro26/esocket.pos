const xmlRequest = require("../xmlRequest");
const eSocket = require("../eSocketClient");
const utils = require("../utils");

const requestData = new xmlRequest();

/**
 * Generate XML request for initializing a session @terminal 12700001
 */
let data = requestData.initialization(12700001);

/**
 * Event data handler
 * @param {String} xml - Response in XML format
 */
const dataHandler = (xml) => {
	console.log(xml);
	console.log(utils.xmlToObject(xml));
};

/**
 * Instantiate socket object
 */
const socket = new eSocket(dataHandler);

/**
 * Connect to socket @host localhost and @port 250000
 */
socket.connect().then(() => {
	console.log("CONNECTED");
	/**
	 * Once connected send initialization xml request
	 */
	socket.tcpWrite(data).then(() => {
		console.log("SENT");
	});
});

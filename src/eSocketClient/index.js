"use-strict";
const net = require("net");
const _ = require("lodash");
const utils = require("../utils");

class eSocket {
	/**
	 * @param {Function} dataEventHandler - Callback for processing data received from socket
	 */
	constructor(dataEventHandler) {
		this.client = new net.Socket();
		this.eventHandler = dataEventHandler;
		this.client.on("data", (data) => {
			this.tcpRead(data);
		});
	}

	/**
	 * Connects to socket
	 * @param {Object} params
	 * @param {Object} params.host - Socket host
	 * @param {Object} params.port - Socket port
	 * @returns
	 */
	async connect(params = { host: "localhost", port: 25000 }) {
		return new Promise((resolve, reject) => {
			this.client.connect(params.port, params.host, () => resolve());
		});
	}

	/**
	 * Send xml data to socket
	 * @param {String} xmlData - String in XML format
	 * @returns
	 */
	async tcpWrite(xmlData) {
		return new Promise((resolve, reject) => {
			const bufferData = utils.xmlToBytes(xmlData);
			this.client.write(bufferData, (err) => {
				if (_.isEmpty(err)) {
					return resolve();
				}
				reject();
			});
		});
	}

	/**
	 * Receive data from socket and converts it into a xml string
	 * @param {Buffer} bufferData - Data received from socket
	 * @returns
	 */
	async tcpRead(bufferData) {
		const response = utils.bytesToXml(bufferData);
		/**
		 * Send formated data to application
		 */
		this.eventHandler(response);
	}
}

module.exports = eSocket;

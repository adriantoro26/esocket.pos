"use-strict";
const net = require("net");
const _ = require("lodash");
const utils = require("../utils");

class eSocket {
  constructor(dataEventHandler) {
    this.client = new net.Socket();
    this.eventHandler = dataEventHandler;
    this.client.on("data", (data) => {
      this.tcpRead(data);
    });
  }

  async connect(params = { host: "localhost", port: 25000 }) {
    return new Promise((resolve, reject) => {
      this.client.connect(params.port, params.host, () => resolve());
    });
  }

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

  async tcpRead(bufferData) {
    const response = utils.bytesToXml(bufferData);
    this.eventHandler(response);
  }
}

module.exports = eSocket;

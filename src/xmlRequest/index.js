"use-strict";
const _ = require("lodash");

class xmlRequest {
  header = '<?xml version="1.0" encoding="UTF-8"?>';
  interface =
    '<Esp:Interface Version="1" xmlns:Esp="http://www.s1.com/Postilion/eSocket.POS/"> ';

  constructor() {
    this.xmlRequest = _.join([this.header, this.interface]);
  }

  initialization(terminalId) {
    const request = _.join([
      this.xmlRequest,
      `<Esp:Admin TerminalId="${terminalId}" Action="INIT" >`,
      this.register({ type: "CALLBACK", eventId: "DATA_REQUIRED" }),
      this.register(),
      "</Esp:Admin>",
    ]);
    return request;
  }

  close(terminalId) {
    const request = _.join([
      this.xmlRequest,
      `<Esp:Admin TerminalId="${terminalId}" Action="CLOSE" ></Esp:Admin>`,
    ]);
    return request;
  }

  payment({ terminalId, transactionId, amount }) {
    const request = _.join([
      this.xmlRequest,
      `<Esp:Transaction TerminalId="${terminalId}" TransactionId="${transactionId}" Type="PURCHASE" TransactionAmount="${amount}"></Esp:Transaction>`,
    ]);
    return request;
  }

  register(params = { type: "EVENT", eventId: "DEBUG_ALL" }) {
    const register = `<Esp:Register Type="${params.type}" EventId="${params.eventId}" />`;
    return register;
  }
}

module.exports = xmlRequest;

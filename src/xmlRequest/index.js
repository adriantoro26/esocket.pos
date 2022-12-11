"use-strict";
const _ = require("lodash");

class xmlRequest {

	constructor() {
		this.header = '<?xml version="1.0" encoding="UTF-8"?>';
		this.interface =
    '<Esp:Interface Version="1" xmlns:Esp="http://www.s1.com/Postilion/eSocket.POS/">';
		this.xmlRequest = _.join([this.header, this.interface], "");
	}

	/**
	 * Generates XML command for instantiating an active terminal session
	 * @param {Integer} terminalId - Set to the terminal ID to be used by the POS
	 * @returns XML request
	 */
	initialization(terminalId) {
		const request = _.join([
			this.xmlRequest,
			`<Esp:Admin TerminalId="${terminalId}" Action="INIT" >`,
			this.register({ type: "CALLBACK", eventId: "DATA_REQUIRED" }),
			this.register(),
			"</Esp:Admin>",
		], "");
		return request;
	}
	/**
	 * Generates XML command for closing an active terminal session
	 * @param {Integer} terminalId - Set to the terminal ID used by the POS
	 * @returns XML request
	 */
	close(terminalId) {
		const request = _.join([
			this.xmlRequest,
			`<Esp:Admin TerminalId="${terminalId}" Action="CLOSE" ></Esp:Admin>`,
		], "");
		return request;
	}
	/**
	 * Generates XML command for sending a transaction request
	 * @param {Object} params - Data object
	 * @param {Integer} params.terminalId - Set to the terminal ID to be used by the POS
	 * @param {Integer} params.transactionId - Sequential number between 100000 and 999999
	 * @param {Integer} params.amount - Amount in fils (x1000)
	 * @returns XML request
	 */
	payment({ terminalId, transactionId, amount }) {
		const request = _.join([
			this.xmlRequest,
			`<Esp:Transaction TerminalId="${terminalId}" TransactionId="${transactionId}" Type="PURCHASE" TransactionAmount="${amount}"></Esp:Transaction>`,
		], "");
		return request;
	}
	/**
	 * Generates XML command for registering an event/callback
	 * @param {Object} params - Data object
	 * @param {Integer} params.type - Set to 'EVENT'
	 * @param {Integer} params.eventId - Event ID
	 * @returns XML request
	 */
	register(params = { type: "EVENT", eventId: "DEBUG_ALL" }) {
		const register = `<Esp:Register Type="${params.type}" EventId="${params.eventId}" />`;
		return register;
	}
}

module.exports = xmlRequest;

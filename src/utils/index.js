"use-strict";
const _ = require("lodash");
const { xml2js } = require("xml-js");

/**
 * Convert a integer number into a an unsigned 8-bit byte array
 * @param {Integer} integer - Integer value
 * @param {Integer} length - Length of bytes array
 * @param {Boolean} endianness - If true the order is Big Endian, otherwise Little Endian
 * @returns Byte array in unsigned 8-bit format
 */
function integerToBytesArray(integer, length = 2, endianness = false) {
  let value = integer;
  const dataArray = new Uint8Array(length);

  for (let i = 0; i < length && value > 0; i++) {
    dataArray[i] = value & 0xff;
    value = value >> 8;
  }

  if (endianness) {
    _.reverse(dataArray);
  }

  return dataArray;
}

module.exports = {
  /**
   * Converts a string in xml format to a Byte array encoded in the following way:
   * <header><payload>
   * Where the length of the header is 2-bytes or 6-bytes and represents the number of bytes sent in the payload
   * @param {String} dataXML
   * @returns
   */
  xmlToBytes: (dataXML) => {
    let payload = {
      header: [],
      data: [],
      length: 0,
    };

    payload.data = Buffer.from(dataXML);
    payload.length = _.size(payload.data);

    if (payload.length > 0xffff) {
      payload.header = integerToBytesArray(payload.length, 4);
      payload.header = _.concat(payload.header, [0xff, 0xff]);
    } else {
      payload.header = integerToBytesArray(payload.length);
    }

    _.reverse(payload.header);

    return Buffer.concat([payload.header, payload.data]);
  },
  /**
   * Converts a Byte array into a string in xml format
   * @param {String} dataBytes - Bytes array in <header><paylaod> format
   * @param {String} format - String or object XML format
   * @param {String} options - XML to object conversion options
   * @returns {String | Object}
   */
  bytesToXml: (
    dataBytes,
    format = "string",
    options = {
      compact: true,
      ignoreComment: true,
      spaces: 4,
    }
  ) => {
    let header = dataBytes.readIntBE(0, 2);

    if (header == 0xffff) {
      header = dataBytes.readIntBE(2, 6);
    }
    dataBytes = dataBytes.subarray(dataBytes.length - header);

    let xml = dataBytes.toString();

    if (format == "string") {
      return xml;
    }
    return xml2js(xml, options);
  },
};

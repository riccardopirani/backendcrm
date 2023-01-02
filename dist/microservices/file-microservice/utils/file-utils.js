"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
const streamToArray = require("stream-to-array");
class FileUtils {
  static streamToBuffer(stream) {
    return new Promise(async (resolve, reject) => {
      streamToArray(stream, function (err, arr) {
        if (err) {
          reject(err);
        }
        const buffers = arr.map((part) =>
          Buffer.isBuffer(part) ? part : Buffer.from(part)
        );
        resolve(Buffer.concat(buffers));
      });
    });
  }
}
exports.FileUtils = FileUtils;
//# sourceMappingURL=file-utils.js.map

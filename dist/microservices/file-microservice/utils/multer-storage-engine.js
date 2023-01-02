"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterStorageEngine = void 0;
class MulterStorageEngine {
  constructor(destination) {
    this.destination = destination;
  }
  _handleFile(req, file, cb) {
    this.destination(req, file, cb);
  }
  _removeFile(req, file, cb) {
    console.log(file);
  }
}
exports.MulterStorageEngine = MulterStorageEngine;
//# sourceMappingURL=multer-storage-engine.js.map

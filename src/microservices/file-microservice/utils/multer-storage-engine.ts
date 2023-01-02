export class MulterStorageEngine {
  private destination: (req, file, cb) => void;

  constructor(destination: (req, file, cb) => void) {
    this.destination = destination;
  }

  _handleFile(req, file, cb) {
    this.destination(req, file, cb);
  }

  _removeFile(req, file, cb) {
    console.log(file);
  }
}

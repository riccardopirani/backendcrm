import * as streamToArray from "stream-to-array";

export class FileUtils {
  static streamToBuffer(stream: any): Promise<Buffer> {
    return new Promise(async (resolve: any, reject: any) => {
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

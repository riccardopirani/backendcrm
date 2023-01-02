export declare class MulterStorageEngine {
  private destination;
  constructor(destination: (req: any, file: any, cb: any) => void);
  _handleFile(req: any, file: any, cb: any): void;
  _removeFile(req: any, file: any, cb: any): void;
}

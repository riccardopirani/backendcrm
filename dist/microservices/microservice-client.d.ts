import { AxiosResponse } from "axios";
export declare enum SourceServiceTypes {
  DOCUMENT = "DOCUMENT",
  FILE = "FILE",
  NOTIFICATION = "NOTIFICATION",
}
declare class MtMicroServiceClass {
  private fileServiceEndPointUrl;
  setup(fileServiceEndPointUrl: string): void;
  getDownloadUrlPart(id: any): string;
  getDownloadThumbnailUrlPart(id: any): string;
  saveFile(file: any): Promise<any>;
  deleteFiles(ids: number[]): Promise<AxiosResponse[]>;
  private deleteFileById;
}
declare const MicroserviceClient: MtMicroServiceClass;
export default MicroserviceClient;

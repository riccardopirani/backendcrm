import { AxiosResponse } from "axios";
import { FileUtils } from "./file-microservice/utils/file-utils";
import { MTRequest } from "./microservice-request";
import * as FormData from "form-data";

export enum SourceServiceTypes {
  DOCUMENT = "DOCUMENT",
  FILE = "FILE",
  NOTIFICATION = "NOTIFICATION",
}

class MtMicroServiceClass {
  private fileServiceEndPointUrl: string;

  setup(fileServiceEndPointUrl: string) {
    this.fileServiceEndPointUrl = fileServiceEndPointUrl;
  }

  public getDownloadUrlPart(id: any): string {
    return ["download", id + ""].join("/");
  }

  public getDownloadThumbnailUrlPart(id: any): string {
    return ["download", id + "", "thumbnail"].join("/");
  }

  async saveFile(file: any): Promise<any> {
    const formData = new FormData();
    const data = { sourceService: SourceServiceTypes.DOCUMENT };
    formData.append("data", JSON.stringify(data));
    const buffer = await FileUtils.streamToBuffer(file.stream);
    formData.append("files", buffer, { filename: file.originalname });
    const res: any = await MTRequest.postWithFormData(
      this.fileServiceEndPointUrl,
      formData
    );
    const array: any[] = res.data as any[];
    if (array.length === 0) {
      return null;
    }
    return array[0];
  }

  public async deleteFiles(ids: number[]): Promise<AxiosResponse[]> {
    return await Promise.all(
      ids.map(async (id) => await this.deleteFileById(id))
    );
  }

  private async deleteFileById(id): Promise<AxiosResponse> {
    return await MTRequest.delete([this.fileServiceEndPointUrl, id].join("/"));
  }
}

const MicroserviceClient = new MtMicroServiceClass();
export default MicroserviceClient;

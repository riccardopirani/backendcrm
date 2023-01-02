import { AxiosResponse } from "axios";
import { DeleteResult } from "typeorm";
import { BaseService } from "../../base-services/base.service";
export declare class FileService {
  addFileToItem<Entity>(
    service: BaseService<Entity>,
    item: any,
    fileField: string,
    req: any
  ): Promise<Entity | Entity[]>;
  private saveSingleItemWithFile;
  private saveMultipleAttachmentItemsWithFiles;
  deleteEntityAndFileByItemIdAndFileField<Entity>(
    service: BaseService<Entity>,
    id: number,
    fileField: string
  ): Promise<DeleteResult>;
  deleteFileByItemIdAndFileField<Entity>(
    service: BaseService<Entity>,
    id: number,
    fileField: string
  ): Promise<Entity>;
  deleteFileById(id: number): Promise<AxiosResponse[]>;
  private removeFilesByReqRes;
  private getFilesFromReq;
  private hasAlmostOneFile;
}

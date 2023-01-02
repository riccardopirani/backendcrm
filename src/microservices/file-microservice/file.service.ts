import { BadRequestException, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { DeleteResult, getManager } from "typeorm";
import { BaseService } from "../../base-services/base.service";
import MicroserviceClient from "../microservice-client";

@Injectable()
export class FileService {
  public async addFileToItem<Entity>(
    service: BaseService<Entity>,
    item: any,
    fileField: string,
    req: any
  ): Promise<Entity | Entity[]> {
    try {
      const files: any[] = this.getFilesFromReq(req);
      if (!files) {
        console.error("No files added!");
        throw new BadRequestException("No files added!");
      }
      if (files.length === 1) {
        return await this.saveSingleItemWithFile(
          service,
          item,
          fileField,
          files[0]
        );
      } else {
        return await this.saveMultipleAttachmentItemsWithFiles(
          service,
          item,
          fileField,
          files
        );
      }
    } catch (e) {
      this.removeFilesByReqRes(req);
      throw e;
    }
  }

  private async saveSingleItemWithFile<Entity>(
    service: BaseService<Entity>,
    item: any,
    fileField: string,
    file: any
  ): Promise<Entity> {
    let output = null;
    await getManager().transaction(async (transactionalEntityManager) => {
      item[fileField] = file.id;
      item.file_original_name = file.original_name;
      item.file_content_type = file.content_type;
      item.file_name = file.name;
      if (!item.id) {
        output = await service.create(item, transactionalEntityManager);
      } else {
        output = await service.updateEntity(item, transactionalEntityManager);
      }
    });
    return output;
  }

  private async saveMultipleAttachmentItemsWithFiles<Entity>(
    service: BaseService<Entity>,
    item: any,
    fileField: string,
    files: any[]
  ): Promise<Entity[]> {
    let output = null;
    await getManager().transaction(async (transactionalEntityManager) => {
      const attachmentList: any[] = [];
      for (let file of files) {
        let attachment = { ...item };
        attachment[fileField] = file.id;
        attachment.file_original_name = file.original_name;
        attachment.file_content_type = file.content_type;
        attachment.file_name = file.name;
        attachmentList.push(attachment);
      }
      output = await service.createArray(
        attachmentList,
        transactionalEntityManager
      );
    });
    return output;
  }

  public async deleteEntityAndFileByItemIdAndFileField<Entity>(
    service: BaseService<Entity>,
    id: number,
    fileField: string
  ): Promise<DeleteResult> {
    const item = await service.getOne(id);
    const oldFileId = item[fileField];
    // @ts-ignore
    const deleteResult = await service.delete(item.id);
    if (!!oldFileId) {
      this.deleteFileById(oldFileId);
    }
    return deleteResult;
  }

  public async deleteFileByItemIdAndFileField<Entity>(
    service: BaseService<Entity>,
    id: number,
    fileField: string
  ): Promise<Entity> {
    const item = await service.getOne(id);
    const oldFileId = item[fileField];
    item[fileField] = null;
    const updatedEntity = await service.updateEntity(item);
    if (!!oldFileId) {
      this.deleteFileById(oldFileId);
    }
    return updatedEntity;
  }

  public async deleteFileById(id: number): Promise<AxiosResponse[]> {
    return await MicroserviceClient.deleteFiles([id]);
  }

  private removeFilesByReqRes(req): void {
    try {
      const files: any[] = this.getFilesFromReq(req);
      if (!files) {
        throw new BadRequestException();
      }
      const ids: number[] = files.map((file) => file.id);
      MicroserviceClient.deleteFiles(ids);
    } catch (e) {
      // TODO Log
      console.error(e);
    }
  }

  private getFilesFromReq(req): any[] {
    return req.dynamicNames;
  }

  private hasAlmostOneFile(req): boolean {
    const files: any[] = this.getFilesFromReq(req);
    return !!files && files.length > 0;
  }
}

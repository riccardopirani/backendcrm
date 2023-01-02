"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const microservice_client_1 = require("../microservice-client");
let FileService = class FileService {
  async addFileToItem(service, item, fileField, req) {
    try {
      const files = this.getFilesFromReq(req);
      if (!files) {
        console.error("No files added!");
        throw new common_1.BadRequestException("No files added!");
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
  async saveSingleItemWithFile(service, item, fileField, file) {
    let output = null;
    await (0, typeorm_1.getManager)().transaction(
      async (transactionalEntityManager) => {
        item[fileField] = file.id;
        item.file_original_name = file.original_name;
        item.file_content_type = file.content_type;
        item.file_name = file.name;
        if (!item.id) {
          output = await service.create(item, transactionalEntityManager);
        } else {
          output = await service.updateEntity(item, transactionalEntityManager);
        }
      }
    );
    return output;
  }
  async saveMultipleAttachmentItemsWithFiles(service, item, fileField, files) {
    let output = null;
    await (0, typeorm_1.getManager)().transaction(
      async (transactionalEntityManager) => {
        const attachmentList = [];
        for (let file of files) {
          let attachment = Object.assign({}, item);
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
      }
    );
    return output;
  }
  async deleteEntityAndFileByItemIdAndFileField(service, id, fileField) {
    const item = await service.getOne(id);
    const oldFileId = item[fileField];
    const deleteResult = await service.delete(item.id);
    if (!!oldFileId) {
      this.deleteFileById(oldFileId);
    }
    return deleteResult;
  }
  async deleteFileByItemIdAndFileField(service, id, fileField) {
    const item = await service.getOne(id);
    const oldFileId = item[fileField];
    item[fileField] = null;
    const updatedEntity = await service.updateEntity(item);
    if (!!oldFileId) {
      this.deleteFileById(oldFileId);
    }
    return updatedEntity;
  }
  async deleteFileById(id) {
    return await microservice_client_1.default.deleteFiles([id]);
  }
  removeFilesByReqRes(req) {
    try {
      const files = this.getFilesFromReq(req);
      if (!files) {
        throw new common_1.BadRequestException();
      }
      const ids = files.map((file) => file.id);
      microservice_client_1.default.deleteFiles(ids);
    } catch (e) {
      console.error(e);
    }
  }
  getFilesFromReq(req) {
    return req.dynamicNames;
  }
  hasAlmostOneFile(req) {
    const files = this.getFilesFromReq(req);
    return !!files && files.length > 0;
  }
};
FileService = __decorate([(0, common_1.Injectable)()], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map

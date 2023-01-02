"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceServiceTypes = void 0;
const file_utils_1 = require("./file-microservice/utils/file-utils");
const microservice_request_1 = require("./microservice-request");
const FormData = require("form-data");
var SourceServiceTypes;
(function (SourceServiceTypes) {
  SourceServiceTypes["DOCUMENT"] = "DOCUMENT";
  SourceServiceTypes["FILE"] = "FILE";
  SourceServiceTypes["NOTIFICATION"] = "NOTIFICATION";
})(
  (SourceServiceTypes =
    exports.SourceServiceTypes || (exports.SourceServiceTypes = {}))
);
class MtMicroServiceClass {
  setup(fileServiceEndPointUrl) {
    this.fileServiceEndPointUrl = fileServiceEndPointUrl;
  }
  getDownloadUrlPart(id) {
    return ["download", id + ""].join("/");
  }
  getDownloadThumbnailUrlPart(id) {
    return ["download", id + "", "thumbnail"].join("/");
  }
  async saveFile(file) {
    const formData = new FormData();
    const data = { sourceService: SourceServiceTypes.DOCUMENT };
    formData.append("data", JSON.stringify(data));
    const buffer = await file_utils_1.FileUtils.streamToBuffer(file.stream);
    formData.append("files", buffer, { filename: file.originalname });
    const res = await microservice_request_1.MTRequest.postWithFormData(
      this.fileServiceEndPointUrl,
      formData
    );
    const array = res.data;
    if (array.length === 0) {
      return null;
    }
    return array[0];
  }
  async deleteFiles(ids) {
    return await Promise.all(
      ids.map(async (id) => await this.deleteFileById(id))
    );
  }
  async deleteFileById(id) {
    return await microservice_request_1.MTRequest.delete(
      [this.fileServiceEndPointUrl, id].join("/")
    );
  }
}
const MicroserviceClient = new MtMicroServiceClass();
exports.default = MicroserviceClient;
//# sourceMappingURL=microservice-client.js.map

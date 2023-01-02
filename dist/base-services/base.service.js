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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let BaseService = class BaseService {
  constructor(repository, entityClass) {
    this.repository = repository;
    this.entityClass = entityClass;
    this.postProcessorList = [];
    this.preProcessorList = [];
  }
  addPostProcessor(p) {
    this.postProcessorList.push(p);
  }
  addPreProcessor(p) {
    this.preProcessorList.push(p);
  }
  processOutput(t) {
    let result = t;
    for (const processor of this.postProcessorList) {
      result = processor.process(result);
    }
    return result;
  }
  processInput(t) {
    let result = t;
    for (const processor of this.preProcessorList) {
      result = processor.process(result);
    }
    return result;
  }
  getTableColumns() {
    return (0, typeorm_1.getConnection)()
      .getMetadata(this.entityClass)
      .ownColumns.map((column) => column.propertyName);
  }
  checkIfNotFound(found) {
    if (!found) {
      throw new common_1.NotFoundException();
    }
  }
  checkIsArray(entity) {
    if (Array.isArray(entity)) {
      throw new common_1.NotAcceptableException("Entity is an Array!!!");
    }
  }
  returnFoundOrUndefined(found) {
    if (!found) {
      return undefined;
    } else {
      return this.processOutput(found);
    }
  }
  async getOne(id, transaction = null) {
    let found;
    if (!transaction) {
      found = await this.repository.findOne(id);
    } else {
      found = await transaction.findOne(this.entityClass, id);
    }
    this.checkIfNotFound(found);
    return this.processOutput(found);
  }
  async getOneOrUndefined(id, transaction = null) {
    let found;
    if (!transaction) {
      found = await this.repository.findOne(id);
    } else {
      found = await transaction.findOne(this.entityClass, id);
    }
    return this.returnFoundOrUndefined(found);
  }
  async getOneByIdAndRelations(id, relations) {
    return await this.getOneBySpec({ where: { id: id }, relations: relations });
  }
  async getOneByIdAndRelationsOrUndefined(id, relations) {
    return await this.getOneBySpecOrUndefined({
      where: { id: id },
      relations: relations,
    });
  }
  async getOneBySpec(spec, transaction = null) {
    let found;
    if (!transaction) {
      found = await this.repository.findOne(spec);
    } else {
      found = await transaction.findOne(this.entityClass, spec);
    }
    this.checkIfNotFound(found);
    return this.processOutput(found);
  }
  async getOneBySpecOrUndefined(spec, transaction = null) {
    let found;
    if (!transaction) {
      found = await this.repository.findOne(spec);
    } else {
      found = await transaction.findOne(this.entityClass, spec);
    }
    return this.returnFoundOrUndefined(found);
  }
  async getAll() {
    return this.processOutput(await this.repository.find());
  }
  async getAllWithRelations(relations) {
    return await this.getAllBySpec({ relations: relations });
  }
  async getAllWithRelationsAndOrder(relations, order) {
    return await this.getAllBySpec({ relations: relations, order: order });
  }
  async getAllWithRelationsByWhereCond(where, relations) {
    return await this.getAllBySpec({ where: where, relations: relations });
  }
  async getAllWithRelationsAndOrderByWhereCond(where, relations, order) {
    return await this.getAllBySpec({
      where: where,
      relations: relations,
      order: order,
    });
  }
  async getAllBySpec(spec) {
    let found = await this.repository.find(spec);
    return this.processOutput(found);
  }
  async create(entity, transaction = null) {
    this.checkIsArray(entity);
    delete entity.id;
    let insertOutput;
    if (!transaction) {
      insertOutput = await this.repository.save(this.processInput(entity));
    } else {
      insertOutput = await transaction.save(
        this.entityClass,
        this.processInput(entity)
      );
    }
    return await this.getOne(insertOutput.id, transaction);
  }
  async createArray(entityArray, transaction = null) {
    entityArray = entityArray.map((en) => {
      delete en.id;
      return en;
    });
    let insertOutput;
    if (!transaction) {
      insertOutput = await this.repository.save(this.processInput(entityArray));
    } else {
      insertOutput = await transaction.save(
        this.entityClass,
        this.processInput(entityArray)
      );
    }
    return this.processOutput(insertOutput);
  }
  async delete(id, transaction = null) {
    let entityToRemove = await this.getOne(id);
    if (!transaction) {
      return await this.repository.delete(id);
    } else {
      return await transaction.delete(this.entityClass, entityToRemove.id);
    }
  }
  async deleteBySpec(spec, transaction = null) {
    if (!transaction) {
      return await this.repository.delete(spec);
    } else {
      return await transaction.delete(this.entityClass, spec);
    }
  }
  async updateEntity(entity, transaction = null) {
    if (!entity.id) {
      throw new common_1.NotAcceptableException();
    }
    return await this.update(entity.id, entity, transaction);
  }
  async update(id, entity, transaction = null) {
    this.checkIsArray(entity);
    let found = await this.getOne(id);
    let entityToSave = this.repository.create(entity);
    entityToSave.id = found.id;
    let updateOutput;
    if (!transaction) {
      updateOutput = await this.repository.save(
        this.processInput(entityToSave)
      );
    } else {
      updateOutput = await transaction.save(
        this.entityClass,
        this.processInput(entityToSave)
      );
    }
    return await this.getOne(updateOutput.id, transaction);
  }
};
BaseService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object]),
  ],
  BaseService
);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map

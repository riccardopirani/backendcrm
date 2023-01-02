import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import {
  DeleteResult,
  EntityManager,
  EntityTarget,
  getConnection,
  Repository,
} from "typeorm";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { IProcessor } from "../middleware/processors/base.processor";

@Injectable()
export abstract class BaseService<Entity> {
  private postProcessorList: IProcessor[] = [];
  private preProcessorList: IProcessor[] = [];

  protected constructor(
    private readonly repository: Repository<Entity>,
    private readonly entityClass: EntityTarget<Entity>
  ) {}

  /*
   **************************************************
   ***             Pre/Post Processors            ***
   **************************************************
   */

  protected addPostProcessor(p: IProcessor) {
    this.postProcessorList.push(p);
  }

  protected addPreProcessor(p: IProcessor) {
    this.preProcessorList.push(p);
  }

  protected processOutput(t: any): any {
    let result = t;
    for (const processor of this.postProcessorList) {
      result = processor.process(result);
    }
    return result;
  }

  protected processInput(t: any): any {
    let result = t;
    for (const processor of this.preProcessorList) {
      result = processor.process(result);
    }
    return result;
  }

  /*
   **************************************************
   ***              Repository/Entity             ***
   **************************************************
   */

  protected getTableColumns(): string[] {
    return getConnection()
      .getMetadata(this.entityClass)
      .ownColumns.map((column) => column.propertyName);
  }

  /*
   **************************************************
   ***                    Utils                   ***
   **************************************************
   */

  private checkIfNotFound(found: any): void {
    if (!found) {
      throw new NotFoundException();
    }
  }

  private checkIsArray(entity: any): void {
    if (Array.isArray(entity)) {
      throw new NotAcceptableException("Entity is an Array!!!");
    }
  }

  private returnFoundOrUndefined(
    found: Entity | undefined
  ): Entity | undefined {
    if (!found) {
      return undefined;
    } else {
      return this.processOutput(found);
    }
  }

  /*
   **************************************************
   ***                API: Get One                ***
   **************************************************
   */

  public async getOne(
    id: number,
    transaction: EntityManager = null
  ): Promise<Entity> {
    let found;
    if (!transaction) {
      found = await this.repository.findOne(id);
    } else {
      found = await transaction.findOne(this.entityClass, id);
    }
    this.checkIfNotFound(found);
    return this.processOutput(found);
  }

  public async getOneOrUndefined(
    id: number,
    transaction: EntityManager = null
  ): Promise<Entity | undefined> {
    let found;
    if (!transaction) {
      found = await this.repository.findOne(id);
    } else {
      found = await transaction.findOne(this.entityClass, id);
    }
    return this.returnFoundOrUndefined(found);
  }

  public async getOneByIdAndRelations(
    id: number,
    relations: string[]
  ): Promise<Entity> {
    return await this.getOneBySpec({ where: { id: id }, relations: relations });
  }

  public async getOneByIdAndRelationsOrUndefined(
    id: number,
    relations: string[]
  ): Promise<Entity | undefined> {
    return await this.getOneBySpecOrUndefined({
      where: { id: id },
      relations: relations,
    });
  }

  public async getOneBySpec(
    spec: FindConditions<Entity> | FindOneOptions<Entity>,
    transaction: EntityManager = null
  ): Promise<Entity> {
    let found; // spec = {where: {abc: cba}, relations: [pippo, pluto]} OR {abc: cba}
    if (!transaction) {
      found = await this.repository.findOne(spec);
    } else {
      found = await transaction.findOne(this.entityClass, spec);
    }
    this.checkIfNotFound(found);
    return this.processOutput(found);
  }

  public async getOneBySpecOrUndefined(
    spec: FindConditions<Entity> | FindOneOptions<Entity>,
    transaction: EntityManager = null
  ): Promise<Entity | undefined> {
    let found; // spec = {where: {abc: cba}, relations: [pippo, pluto]} OR {abc: cba}
    if (!transaction) {
      found = await this.repository.findOne(spec);
    } else {
      found = await transaction.findOne(this.entityClass, spec);
    }
    return this.returnFoundOrUndefined(found);
  }

  /*
   **************************************************
   ***                API: Get All                ***
   **************************************************
   */

  public async getAll(): Promise<Entity[]> {
    return this.processOutput(await this.repository.find());
  }

  public async getAllWithRelations(relations: string[]): Promise<Entity[]> {
    return await this.getAllBySpec({ relations: relations });
  }

  public async getAllWithRelationsAndOrder(
    relations: string[],
    order: any
  ): Promise<Entity[]> {
    return await this.getAllBySpec({ relations: relations, order: order });
  }

  public async getAllWithRelationsByWhereCond(
    where: any,
    relations: string[]
  ): Promise<Entity[]> {
    return await this.getAllBySpec({ where: where, relations: relations });
  }

  public async getAllWithRelationsAndOrderByWhereCond(
    where: any,
    relations: string[],
    order: any
  ): Promise<Entity[]> {
    return await this.getAllBySpec({
      where: where,
      relations: relations,
      order: order,
    });
  }

  public async getAllBySpec(spec: FindManyOptions<Entity>): Promise<Entity[]> {
    let found = await this.repository.find(spec); // spec = {where: {abc: cba}, relations: [pippo, pluto]} OR {abc: cba}
    return this.processOutput(found);
  }

  /*
   **************************************************
   ***                API: Create                 ***
   **************************************************
   */

  public async create(
    entity: Entity,
    transaction: EntityManager = null
  ): Promise<Entity> {
    this.checkIsArray(entity);
    // @ts-ignore
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

  public async createArray(
    entityArray: Entity[],
    transaction: EntityManager = null
  ): Promise<Entity[]> {
    entityArray = entityArray.map((en) => {
      // @ts-ignore
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

  /*
   **************************************************
   ***                API: Delete                 ***
   **************************************************
   */

  public async delete(
    id: number,
    transaction: EntityManager = null
  ): Promise<DeleteResult> {
    let entityToRemove: Entity = await this.getOne(id);
    if (!transaction) {
      return await this.repository.delete(id);
    } else {
      // @ts-ignore
      return await transaction.delete(this.entityClass, entityToRemove.id);
    }
  }

  public async deleteBySpec(
    spec: FindConditions<Entity>,
    transaction: EntityManager = null
  ): Promise<DeleteResult> {
    if (!transaction) {
      return await this.repository.delete(spec);
    } else {
      return await transaction.delete(this.entityClass, spec);
    }
  }

  /*
   **************************************************
   ***                API: Update                 ***
   **************************************************
   */

  public async updateEntity(
    entity: Entity,
    transaction: EntityManager = null
  ): Promise<Entity> {
    // @ts-ignore
    if (!entity.id) {
      throw new NotAcceptableException();
    }
    // @ts-ignore
    return await this.update(entity.id, entity, transaction);
  }

  public async update(
    id: number,
    entity: Entity,
    transaction: EntityManager = null
  ): Promise<Entity> {
    this.checkIsArray(entity);
    let found = await this.getOne(id);
    let entityToSave: Entity = this.repository.create(entity);
    // I set entityToSave.id to found.id ...
    // @ts-ignore
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
}

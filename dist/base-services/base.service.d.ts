import { DeleteResult, EntityManager, EntityTarget, Repository } from "typeorm";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { IProcessor } from "../middleware/processors/base.processor";
export declare abstract class BaseService<Entity> {
  private readonly repository;
  private readonly entityClass;
  private postProcessorList;
  private preProcessorList;
  protected constructor(
    repository: Repository<Entity>,
    entityClass: EntityTarget<Entity>
  );
  protected addPostProcessor(p: IProcessor): void;
  protected addPreProcessor(p: IProcessor): void;
  protected processOutput(t: any): any;
  protected processInput(t: any): any;
  protected getTableColumns(): string[];
  private checkIfNotFound;
  private checkIsArray;
  private returnFoundOrUndefined;
  getOne(id: number, transaction?: EntityManager): Promise<Entity>;
  getOneOrUndefined(
    id: number,
    transaction?: EntityManager
  ): Promise<Entity | undefined>;
  getOneByIdAndRelations(id: number, relations: string[]): Promise<Entity>;
  getOneByIdAndRelationsOrUndefined(
    id: number,
    relations: string[]
  ): Promise<Entity | undefined>;
  getOneBySpec(
    spec: FindConditions<Entity> | FindOneOptions<Entity>,
    transaction?: EntityManager
  ): Promise<Entity>;
  getOneBySpecOrUndefined(
    spec: FindConditions<Entity> | FindOneOptions<Entity>,
    transaction?: EntityManager
  ): Promise<Entity | undefined>;
  getAll(): Promise<Entity[]>;
  getAllWithRelations(relations: string[]): Promise<Entity[]>;
  getAllWithRelationsAndOrder(
    relations: string[],
    order: any
  ): Promise<Entity[]>;
  getAllWithRelationsByWhereCond(
    where: any,
    relations: string[]
  ): Promise<Entity[]>;
  getAllWithRelationsAndOrderByWhereCond(
    where: any,
    relations: string[],
    order: any
  ): Promise<Entity[]>;
  getAllBySpec(spec: FindManyOptions<Entity>): Promise<Entity[]>;
  create(entity: Entity, transaction?: EntityManager): Promise<Entity>;
  createArray(
    entityArray: Entity[],
    transaction?: EntityManager
  ): Promise<Entity[]>;
  delete(id: number, transaction?: EntityManager): Promise<DeleteResult>;
  deleteBySpec(
    spec: FindConditions<Entity>,
    transaction?: EntityManager
  ): Promise<DeleteResult>;
  updateEntity(entity: Entity, transaction?: EntityManager): Promise<Entity>;
  update(
    id: number,
    entity: Entity,
    transaction?: EntityManager
  ): Promise<Entity>;
}

export interface IProcessor {
  process(t: any): any;
}
export declare abstract class BaseProcessor implements IProcessor {
  process(t: any): any;
  abstract processEntity(entity: any): any;
}

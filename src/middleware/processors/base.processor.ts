export interface IProcessor {
  process(t: any): any;
}

export abstract class BaseProcessor implements IProcessor {
  process(t: any): any {
    Array.isArray(t)
      ? t.map((el) => this.processEntity(el))
      : this.processEntity(t);
    return t;
  }

  public abstract processEntity(entity: any);
}

export class BaseProgram {
  public static instance<T extends BaseProgram>(this: new () => T): T {
    if(!(<any>this)._instance){
      (<any>this)._instance = new this();
    }
    return (<any>this)._instance as T;
  }
}
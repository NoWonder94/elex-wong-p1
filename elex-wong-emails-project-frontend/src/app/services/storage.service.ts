import {
  Injectable
} from '@angular/core';
import { JSONObject } from '../model/json';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
  ) { }

  public getJson(key: string, defaultValue: JSONObject): JSONObject {
    let item = localStorage.getItem(key);
    if (!item)
      return defaultValue;
    else
      return JSON.parse(item);
  }

  public setJson(key: string, value: JSONObject) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public delete(key: string) {
    localStorage.removeItem(key);
  }
}

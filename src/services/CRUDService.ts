import { Http } from './HttpService';
import { Identifiable } from '@/models';

interface Params {
  id: string[];
}

export class CRUDService<T extends Identifiable, P, S extends Object> {
  private baseUrl: string = 'http://localhost:8080';
  private endpoint: string;

  constructor(endpoint: string, private factory: (p: P[]) => T[]) {
    this.endpoint = this.baseUrl + '/' + endpoint;
  }

  public list = (params?: Params): Promise<T[]> => {
    const paramsString = params ? parseArrayParams('id', params.id) : '';

    return Http.getJson<P[]>(`${this.endpoint}?${paramsString}`).then(
      this.factory
    );
  };

  public create = (creature: S) => Http.postJson(this.endpoint, creature);

  public delete = (id: string) => Http.deleteRequest(`${this.endpoint}/${id}`);

  public update = (id: string, creature: S) =>
    Http.putRequest(`${this.endpoint}/${id}`, creature);
}

const parseArrayParams = (key: string, items: string[]): string => {
  return items
    .reduce<string>((result, item) => `${result}&${key}=${item}`, '')
    .replace('&', '');
};

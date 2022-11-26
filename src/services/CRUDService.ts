import { Http } from "./HttpService";
import { Identifiable } from "@/models";

export class CRUDService<T extends Identifiable, P, S extends Object> {
  private baseUrl: string = "http://localhost:8080";
  private endpoint: string;

  constructor(endpoint: string, private factory: (p: P[]) => T[]) {
    this.endpoint = this.baseUrl + "/" + endpoint;
  }

  public list = (): Promise<T[]> =>
    Http.getJson<P[]>(this.endpoint).then(this.factory);

  public create = (creature: S) => Http.postJson(this.endpoint, creature);

  public delete = (id: string) => Http.deleteRequest(`${this.endpoint}/${id}`);

  public update = (id: string, creature: S) =>
    Http.putRequest(`${this.endpoint}/${id}`, creature);
}

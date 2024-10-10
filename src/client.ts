import axios from 'axios';
import { Datasources } from './datasources';
import { Minds } from './minds';

export default class Client {
  apiKey: string;
  baseUrl: string;
  public datasources: Datasources;
  public minds: Minds;
  public api: any;

  constructor(apiKey: string, baseUrl: string = 'https://mdb.ai') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });
    this.datasources = new Datasources(this);
    this.minds = new Minds(this);
  }
}

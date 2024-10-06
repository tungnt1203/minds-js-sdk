import { DatabaseConfig } from './types';
class Datasource {
  name: string;
  engine: string;
  description: string;
  connection_data: Record<string, any> | {};
  tables: string[] | [];

  constructor(name: string, engine: string, connection_data: any, description: string, tables: string[]) {
    this.name = name;
    this.engine = engine;
    this.connection_data = connection_data;
    this.description = description;
    this.tables = tables;
  }
}
class Datasources {
  private api: any;
  constructor(client: any) {
    this.api = client.api;
  }

  async get(name: string): Promise<Datasource> {
    const resp = await this.api.get(`/api/datasources/${name}?check_connection=true`);
    const item = resp.data;
    return new Datasource(item.name, item.engine, item.connection_data, item.description, item.tables);
  }

  async list(): Promise<Datasource[]> {
    const resp = await this.api.get("/api/datasources");
    return resp.data.map(
      (item: any) =>
        new Datasource(
          item.name,
          item.engine,
          item.connection_data,
          item.description,
          item.tables
        ),
    );
  };

  async drop(name: string){
    const resp = await this.api.delete(`/api/datasources/${name}`)
    return resp
  }
}

export { Datasources };

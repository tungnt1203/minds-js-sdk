import { Datasource, DatabaseConfig } from './types/databaseConfig'
import { ObjectNotFound, ObjectNotSupported } from './exceptions'

class Datasources {
  private api: any;
  constructor(client: any) {
    this.api = client.api;
  }

  /**
   * Creates a new datasource and returns it
   *
   * @param ds_config - Datasource configuration
   * @param ds_config.name - Name of the datasource
   * @param ds_config.engine - Type of database handler, e.g., 'postgres', 'mysql'
   * @param ds_config.description - Description of the database. Used by mind to know what data can be got from it.
   * @param ds_config.connection_data - dict, optional, credentials to connect to database
   * @param ds_config.tables - Pptional, List of allowed tables
   * @returns A promise that resolves to the created Datasource object
   * @throws {ObjectNotSupported} If the datasource type is not supported
   * @throws {Error} If there's an error during the API call
   */
  async create(ds_config: DatabaseConfig, replace: boolean = false) {
    const name = ds_config.name
    if (replace) {
      try {
        this.get(name)
        this.drop(name)
      } catch (error) {
        if (!(error instanceof ObjectNotFound)) {
          throw error;
        }
      }
    }

    await this.api.post("/api/datasources", ds_config)
    return this.get(name)
  }

  async update(ds_config: Object, datasource_name: string) {

    const resp = await this.api.patch(`/api/datasources/${datasource_name}`, ds_config)
    return resp.data
  }

  async get(name: string): Promise<Datasource> {
    const { data } = await this.api.get(`/api/datasources/${name}?check_connection=true`)
    if (data.engine == null) {
      throw new ObjectNotSupported(`Wrong type of datasource: ${name}`);
    }
    return data as Datasource;

  }

  async list(): Promise<Datasource[]> {
    const { data } = await this.api.get("/api/datasources");
    return data
      .filter((item: Datasource): item is Datasource => item.engine != null)
      .map((item: Datasource) => item as Datasource);
  };

  async drop(name: string){
    const resp = await this.api.delete(`/api/datasources/${name}`)
    return resp.data
  }
}

export { Datasource, Datasources };

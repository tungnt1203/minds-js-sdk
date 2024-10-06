import { Datasource, DatabaseConfig } from './types/databaseConfig';
import { MindInterface } from './types/mindInterface';
interface MindParameters {
  prompt_template?: string;
  [key: string]: any;
}
class Mind implements MindInterface {
  api: any;
  client: any;
  project: string;
  name: string;
  model_name: string | null;
  provider: string | null;
  prompt_template: string | null;
  parameters: any;
  created_at: string | null;
  updated_at: string | null;
  datasources: Datasource[] | null;

  constructor(
    client: any,
    name: string,
    model_name: string | null = null,
    provider: string | null = null,
    parameters: MindParameters = {},
    datasources: Datasource[] | null = null,
    created_at: string | null = null,
    updated_at: string | null = null,
  ) {
    this.api = client.api;
    this.client = client;
    this.project = 'mindsdb';

    this.name = name;
    this.model_name = model_name;
    this.provider = provider;
    this.prompt_template = parameters.prompt_template || null;
    delete parameters.prompt_template;
    this.parameters = parameters;
    this.created_at = created_at;
    this.updated_at = updated_at;

    this.datasources = datasources;
  }

  async update(
    name?: string,
    model_name?: string,
    provider?: string,
    prompt_template?: string,
    datasources?: (Datasource | string | DatabaseConfig)[],
    parameters?: MindParameters,
  ): Promise<void> {
    const data: any = {};

    if (datasources) {
      const ds_names = datasources.map((ds) => this.client.minds._check_datasource(ds));
      data.datasources = ds_names;
    }

    if (name) data.name = name;
    if (model_name) data.model_name = model_name;
    if (provider) data.provider = provider;
    if (parameters) data.parameters = parameters;

    if (prompt_template) {
      if (!data.parameters) data.parameters = {};
      data.parameters.prompt_template = prompt_template;
    }

    await this.api.patch(`/projects/${this.project}/minds/${this.name}`, { data });

    if (name && name !== this.name) {
      this.name = name;
    }
  }

  async add_datasource(datasource: Datasource | string | DatabaseConfig): Promise<void> {
    const ds_name = this.client.minds._check_datasource(datasource);

    await this.api.post(`/projects/${this.project}/minds/${this.name}/datasources`, {
      data: { name: ds_name },
    });

    const updated = await this.client.minds.get(this.name);
    this.datasources = updated.datasources;
  }

  async del_datasource(datasource: Datasource | string): Promise<void> {
    const ds_name = typeof datasource === 'string' ? datasource : datasource.name;

    await this.api.delete(`/projects/${this.project}/minds/${this.name}/datasources/${ds_name}`);

    const updated = await this.client.minds.get(this.name);
    this.datasources = updated.datasources;
  }
}
class Minds {
  public client: any;
  public api: any;
  private project: string;

  constructor(client: any) {
    this.api = client.api;
    this.client = client;
    this.project = 'mindsdb';
  }

  async list(): Promise<Mind[]> {
    const res = await this.api.get(`/api/projects/${this.project}/minds`);
    return res.data.map(
      (item: any) =>
        new Mind(
          this.client,
          item.name,
          item.model_name,
          item.provider,
          item.parameters,
          item.datasources,
          item.created_at,
          item.updated_at,
        ),
    );
  }

  async get(name: string): Promise<Mind> {
    const resp = await this.api.get(`api/projects/${this.project}/minds/${name}`);
    const item = resp.data;
    return new Mind(
      this.client,
      item.name,
      item.model_name,
      item.provider,
      item.parameters,
      item.datasources,
      item.created_at,
      item.updated_at,
    );
  }

  // check_datasource(ds: Datasource | DatabaseConfig | string): string {
  //   if (typeof ds === 'string') {
  //     return ds;
  //   } else if ('name' in ds) {
  //     return ds.name;
  //   } else {
  //     try {
  //       this.client.datasources.get(ds.name);
  //     } catch (error) {
  //       if (error.name === 'ObjectNotFound') {
  //         this.client.datasources.create(ds);
  //       } else {
  //         throw error;
  //       }
  //     }
  //     return ds.name;
  //   }
  // }
}

export { Minds };

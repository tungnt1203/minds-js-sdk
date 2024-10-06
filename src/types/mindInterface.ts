import { Datasource } from './databaseConfig';

export interface MindInterface {
  api: any;
  client: any;
  project: string;
  name: string;
  model_name: string | null;
  provider: string | null;
  prompt_template: string | null;
  parameters: MindParameters;
  created_at: string | null;
  updated_at: string | null;
  datasources: Datasource[] | null;
}

interface MindParameters {
  prompt_template?: string;
  [key: string]: any;
}

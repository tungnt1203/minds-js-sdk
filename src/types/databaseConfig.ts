export interface DatabaseConfig {
  name: string;
  engine: string;
  description: string;
  connection_data?: Record<string, any>;
  tables?: string[];
}

export interface Datasource extends DatabaseConfig {}

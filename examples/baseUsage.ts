import Client from '../src/client';
import { DatabaseConfig } from '../src/types/databaseConfig';
const client = new Client('');

async function getDatasources() {
  const postgres_config = {
    name: 'my_datasource',
    description: '<baab',
    engine: 'postgres',
    connection_data: {
      user: 'demo_user',
      password: 'demo_password',
      host: 'samples.mindsdb.com',
      port: 5432,
      database: 'demo',
      schema: 'demo_data',
    },
  };

  try {
    const mind = await client.minds.get('test_mind');
    mind.completion("hãy cho tôi biết số lượng bảng ghi lớn nhất", true)
  } catch (error) {
    console.error(error);
  }
}

getDatasources();

import Client from '../src/client';
const client = new Client("")

async function getDatasources() {
  try {
    const data = await client.datasources.list();
    return data
  } catch (error) {
    console.error(error);
  }
}

getDatasources();

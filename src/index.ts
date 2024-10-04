import Client from './client';

const client = new Client("44f1686154c270889bf0b3f012cb30394310584ce1ab4309dc2054c4b7881e52")

async function getListMinds() {
  try {
    // Thay '/endpoint' bằng endpoint thực tế bạn muốn gọi
    const data = await client.datasources.drop('companies_mind1_datasource_7bfd30c14e9b475f9200df1870b80bd8_sql_skill_d11ae768-d05d-4014-9173-4f48a74012c4');
    console.log(data);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

getListMinds();
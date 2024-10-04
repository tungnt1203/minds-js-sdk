import * from "src/index"

import Client from './src/client';

async function testAPI() {
  // Thay 'YOUR_API_KEY' bằng API key thực của bạn
  const rs = new Client('44f1686154c270889bf0b3f012cb30394310584ce1ab4309dc2054c4b7881e52');

  try {
    // Thay '/endpoint' bằng endpoint thực tế bạn muốn gọi
    const data = await rs.get('/api/projects/mindsdb/minds/companies_mind1');
    console.log('Dữ liệu nhận được:', data);
  } catch (error) {
    console.error('Lỗi:', error);
  }
}

testAPI();

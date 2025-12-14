const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testMemberListApi() {
  console.log('开始测试会员列表API...\n');

  try {
    // 1. 首先获取管理员token
    console.log('1. 获取管理员登录token...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });

    if (!loginResponse.data.token) {
      console.log('❌ 管理员登录失败');
      return;
    }

    const adminToken = loginResponse.data.token;
    console.log('✅ 管理员登录成功\n');

    // 2. 获取会员列表
    console.log('2. 获取会员列表...');
    const membersResponse = await axios.get(
      `${BASE_URL}/members/all`,
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      }
    );

    console.log('✅ 会员列表获取成功！');
    console.log('响应数据结构:', JSON.stringify(membersResponse.data, null, 2));

    // 3. 查看每个会员的详细数据
    console.log('\n3. 查看每个会员的详细数据:');
    membersResponse.data.members.forEach((member, index) => {
      console.log(`\n会员 ${index + 1}:`);
      console.log('  username:', member.users?.username);
      console.log('  email:', member.users?.email);
      console.log('  membership_level:', member.membership_level);
      console.log('  account_status:', member.users?.account_status);
      console.log('  完整数据:', JSON.stringify(member, null, 2));
    });

  } catch (error) {
    console.error('❌ 测试失败:', error.response?.data || error.message);
  }
}

// 运行测试
testMemberListApi();
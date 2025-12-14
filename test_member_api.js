const axios = require('axios');

// 配置
const BASE_URL = 'http://localhost:3000/api';
let adminToken = '';

// 测试步骤
async function runTests() {
  console.log('开始测试会员管理API...\n');

  try {
    // 1. 管理员登录获取token
    console.log('1. 管理员登录...');
    const loginResponse = await axios.post(
      `${BASE_URL}/auth/login`,
      {
        username: 'admin',
        password: 'admin123'
      }
    );
    
    adminToken = loginResponse.data.token;
    console.log('✅ 登录成功！获取到管理员token');
    console.log('Token长度:', adminToken.length);

    // 2. 获取会员列表
    console.log('\n2. 获取会员列表...');
    const membersResponse = await axios.get(
      `${BASE_URL}/members/all`,
      {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      }
    );
    
    console.log('✅ 会员列表获取成功！');
    console.log(`会员数量: ${membersResponse.data.members.length}`);
    console.log('响应数据结构:', JSON.stringify(membersResponse.data, null, 2));

    // 3. 检查会员数据字段完整性
    if (membersResponse.data.members.length > 0) {
      console.log('\n3. 检查会员数据字段完整性...');
      const firstMember = membersResponse.data.members[0];
      
      // 检查关键字段是否存在且有值
      const requiredFields = [
        'member_id', 'username', 'email', 'role', 'membership_level',
        'active_status', 'last_active', 'last_login', 'full_name', 'phone',
        'gender', 'address', 'birth_date', 'membership_status', 'profile_updated_at'
      ];
      
      let allFieldsPresent = true;
      requiredFields.forEach(field => {
        if (!firstMember.hasOwnProperty(field)) {
          console.error(`❌ 缺少字段: ${field}`);
          allFieldsPresent = false;
        } else if (firstMember[field] === '-' || firstMember[field] === null || firstMember[field] === undefined) {
          console.warn(`⚠️  字段${field}的值为默认值: ${firstMember[field]}`);
        } else {
          console.log(`✅ 字段${field}的值: ${firstMember[field]}`);
        }
      });
      
      if (allFieldsPresent) {
        console.log('\n✅ 所有必要字段都已存在！');
      } else {
        console.log('\n❌ 缺少某些必要字段！');
      }
    }

    console.log('\n🎉 所有测试完成！');
    
  } catch (error) {
    console.error('测试失败:', error.message);
    if (error.response) {
      console.error('错误响应:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// 运行测试
runTests();
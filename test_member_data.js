const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testMemberData() {
  console.log('开始测试会员数据API...\n');

  try {
    // 1. 登录获取token
    console.log('1. 登录管理员账号...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });

    if (!loginResponse.data.token) {
      console.log('❌ 登录失败');
      return;
    }

    const token = loginResponse.data.token;
    console.log('✅ 登录成功\n');

    // 2. 获取会员列表
    console.log('2. 获取会员列表...');
    const membersResponse = await axios.get(
      `${BASE_URL}/members/all`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    console.log('✅ 会员列表获取成功！');
    console.log('会员总数:', membersResponse.data.members.length);

    // 3. 验证每个会员的数据完整性
    console.log('\n3. 验证会员数据完整性:');
    membersResponse.data.members.forEach((member, index) => {
      console.log(`\n会员 ${index + 1}:`);
      console.log('  member_id:', member.member_id);
      console.log('  username:', member.username);
      console.log('  email:', member.email);
      console.log('  role:', member.role);
      console.log('  membership_level:', member.membership_level);
      console.log('  active_status:', member.active_status);
      console.log('  last_active:', member.last_active);
      console.log('  last_login:', member.last_login);
    });

    // 4. 检查是否所有字段都有值（不是默认的"-"）
    console.log('\n4. 检查数据完整性统计:');
    const allMembers = membersResponse.data.members;
    const totalMembers = allMembers.length;
    
    const hasUsername = allMembers.filter(m => m.username !== '-').length;
    const hasEmail = allMembers.filter(m => m.email !== '-').length;
    const hasMembershipLevel = allMembers.filter(m => m.membership_level !== '-').length;
    const hasActiveStatus = allMembers.filter(m => m.active_status !== '-').length;
    const hasLastActive = allMembers.filter(m => m.last_active !== '-').length;
    const hasLastLogin = allMembers.filter(m => m.last_login !== '-').length;

    console.log(`  有用户名的会员: ${hasUsername}/${totalMembers}`);
    console.log(`  有邮箱的会员: ${hasEmail}/${totalMembers}`);
    console.log(`  有会员等级的会员: ${hasMembershipLevel}/${totalMembers}`);
    console.log(`  有活跃状态的会员: ${hasActiveStatus}/${totalMembers}`);
    console.log(`  有最后活跃时间的会员: ${hasLastActive}/${totalMembers}`);
    console.log(`  有最后登录时间的会员: ${hasLastLogin}/${totalMembers}`);

    console.log('\n🎉 测试完成！');

  } catch (error) {
    console.error('❌ 测试失败:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.log('⚠️  认证失败，请检查管理员账号和密码是否正确');
    } else if (error.response?.status === 500) {
      console.log('⚠️  服务器内部错误，请检查服务器日志');
    }
  }
}

// 运行测试
testMemberData();
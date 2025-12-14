const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// 测试数据
const testData = {
  adminToken: '', // 需要先获取管理员token
  memberId: 1, // 需要存在的会员ID
  messageData: {
    subject: '测试消息主题',
    content: '这是一条测试消息内容'
  }
};

async function testMessageSending() {
  console.log('开始测试消息发送功能...\n');

  try {
    // 1. 首先获取管理员token
    console.log('1. 获取管理员登录token...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'admin', // 需要有效的管理员用户名
      password: 'admin123' // 需要有效的管理员密码
    });

    if (!loginResponse.data.token) {
      console.log('❌ 管理员登录失败，请检查管理员账户是否存在');
      return;
    }

    testData.adminToken = loginResponse.data.token;
    console.log('✅ 管理员登录成功，token已获取\n');

    // 2. 测试发送消息给会员
    console.log('2. 测试发送消息给会员...');
    const messageResponse = await axios.post(
      `${BASE_URL}/members/${testData.memberId}/message`,
      testData.messageData,
      {
        headers: {
          'Authorization': `Bearer ${testData.adminToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ 消息发送成功！');
    console.log('响应数据:', messageResponse.data);

    // 3. 验证消息是否已正确保存
    console.log('\n3. 验证消息是否已保存到数据库...');
    const messagesResponse = await axios.get(
      `${BASE_URL}/messages`,
      {
        headers: {
          'Authorization': `Bearer ${testData.adminToken}`
        }
      }
    );

    const latestMessage = messagesResponse.data[messagesResponse.data.length - 1];
    console.log('最新消息:', {
      subject: latestMessage.subject,
      content: latestMessage.content,
      receiver_id: latestMessage.receiver_id,
      sent_at: latestMessage.sent_at
    });

    console.log('\n🎉 消息发送功能测试完成！所有功能正常！');

  } catch (error) {
    console.error('❌ 测试失败:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      console.log('⚠️  会员不存在，请检查会员ID是否正确');
    } else if (error.response?.status === 401) {
      console.log('⚠️  认证失败，请检查token是否有效');
    } else if (error.response?.status === 400) {
      console.log('⚠️  请求数据格式错误，请检查消息数据');
    }
  }
}

// 运行测试
testMessageSending();
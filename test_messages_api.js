const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// 测试消息相关API端点
async function testMessagesAPI() {
  console.log('开始测试消息相关API...\n');

  try {
    // 1. 测试获取未读消息数量
    console.log('1. 测试获取未读消息数量...');
    try {
      const response = await axios.get(`${BASE_URL}/members/messages/unread/count`);
      console.log('✅ 未读消息数量API响应:', response.data);
    } catch (error) {
      console.log('❌ 未读消息数量API错误:', error.response?.data || error.message);
    }

    // 2. 测试获取消息列表
    console.log('\n2. 测试获取消息列表...');
    try {
      const response = await axios.get(`${BASE_URL}/members/messages`);
      console.log('✅ 消息列表API响应:', response.data);
    } catch (error) {
      console.log('❌ 消息列表API错误:', error.response?.data || error.message);
    }

    // 3. 测试管理员获取消息列表
    console.log('\n3. 测试管理员获取消息列表...');
    try {
      const response = await axios.get(`${BASE_URL}/members/admin/messages`);
      console.log('✅ 管理员消息列表API响应:', response.data);
    } catch (error) {
      console.log('❌ 管理员消息列表API错误:', error.response?.data || error.message);
    }

    // 4. 测试发送消息给管理员
    console.log('\n4. 测试发送消息给管理员...');
    try {
      const messageData = {
        subject: '测试消息主题',
        content: '这是一条测试消息内容',
        file_name: null,
        file_path: null,
        file_size: null,
        file_type: null
      };
      const response = await axios.post(`${BASE_URL}/members/message-to-admin`, messageData);
      console.log('✅ 发送消息API响应:', response.data);
    } catch (error) {
      console.log('❌ 发送消息API错误:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

// 运行测试
testMessagesAPI();
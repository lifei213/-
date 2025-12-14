const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// 测试消息相关API端点（带认证）
async function testMessagesAPIWithAuth() {
  console.log('开始测试消息相关API（带认证）...\n');

  let authToken = null;

  try {
    // 1. 先登录获取认证令牌
    console.log('1. 登录获取认证令牌...');
    try {
      const loginData = {
        email: 'test@example.com', // 使用一个已存在的测试用户
        password: 'password123'
      };
      
      const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
      authToken = response.data.token;
      console.log('✅ 登录成功，获取到令牌');
    } catch (error) {
      console.log('❌ 登录失败:', error.response?.data || error.message);
      
      // 如果登录失败，尝试注册新用户
      console.log('尝试注册新用户...');
      try {
        const registerData = {
          email: 'test@example.com',
          password: 'password123',
          name: '测试用户',
          phone: '1234567890',
          role: 'member'
        };
        
        const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
        authToken = registerResponse.data.token;
        console.log('✅ 注册成功，获取到令牌');
      } catch (registerError) {
        console.log('❌ 注册失败:', registerError.response?.data || registerError.message);
        return;
      }
    }

    if (!authToken) {
      console.log('❌ 无法获取认证令牌，测试终止');
      return;
    }

    // 配置带认证头的axios实例
    const authAxios = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    // 2. 测试获取未读消息数量
    console.log('\n2. 测试获取未读消息数量...');
    try {
      const response = await authAxios.get('/members/messages/unread/count');
      console.log('✅ 未读消息数量API响应:', response.data);
    } catch (error) {
      console.log('❌ 未读消息数量API错误:', error.response?.data || error.message);
      
      // 检查是否是数据库表结构问题
      if (error.response?.data?.message?.includes('column') && error.response?.data?.message?.includes('does not exist')) {
        console.log('⚠️  检测到数据库表结构问题，需要修复messages表');
      }
    }

    // 3. 测试获取消息列表
    console.log('\n3. 测试获取消息列表...');
    try {
      const response = await authAxios.get('/members/messages');
      console.log('✅ 消息列表API响应:', response.data);
    } catch (error) {
      console.log('❌ 消息列表API错误:', error.response?.data || error.message);
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
      const response = await authAxios.post('/members/message-to-admin', messageData);
      console.log('✅ 发送消息API响应:', response.data);
    } catch (error) {
      console.log('❌ 发送消息API错误:', error.response?.data || error.message);
    }

    // 5. 测试管理员获取消息列表（需要管理员权限）
    console.log('\n5. 测试管理员获取消息列表...');
    try {
      const response = await authAxios.get('/members/admin/messages');
      console.log('✅ 管理员消息列表API响应:', response.data);
    } catch (error) {
      console.log('❌ 管理员消息列表API错误:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

// 运行测试
testMessagesAPIWithAuth();
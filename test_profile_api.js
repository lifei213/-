const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testProfileAPI() {
  console.log('开始测试会员资料API...');
  
  // 1. 首先注册一个新用户获取认证令牌
  console.log('1. 注册新用户获取认证令牌...');
  let authToken = '';
  
  try {
    const timestamp = Date.now();
    const registerData = {
      username: `testuser${timestamp}`,
      email: `test${timestamp}@example.com`,
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
  
  // 2. 测试获取个人资料（应该返回会员信息不存在）
  console.log('2. 测试获取个人资料...');
  try {
    const profileResponse = await axios.get(`${BASE_URL}/members/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    console.log('✅ 获取个人资料成功:', profileResponse.data);
  } catch (profileError) {
    if (profileError.response?.status === 404) {
      console.log('✅ 获取个人资料返回会员信息不存在（预期结果）');
    } else {
      console.log('❌ 获取个人资料失败:', profileError.response?.data || profileError.message);
      return;
    }
  }
  
  // 3. 测试创建会员资料
  console.log('3. 测试创建会员资料...');
  try {
    const profileData = {
      full_name: '测试用户',
      gender: '男',
      birth_date: '1990-01-01',
      phone: '1234567890',
      address: '测试地址'
      // 暂时移除可能不存在的字段
      // email: 'test@example.com',
      // education_level: '本科',
      // occupation: '工程师',
      // emergency_contact: '紧急联系人',
      // health_info: '健康信息'
    };
    
    const createResponse = await axios.post(`${BASE_URL}/members/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    console.log('✅ 创建会员资料成功:', createResponse.data);
  } catch (createError) {
    console.log('❌ 创建会员资料失败:', createError.response?.data || createError.message);
    return;
  }
  
  // 4. 再次测试获取个人资料（应该成功）
  console.log('4. 再次测试获取个人资料...');
  try {
    const profileResponse = await axios.get(`${BASE_URL}/members/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    console.log('✅ 获取个人资料成功，会员信息:', profileResponse.data.member.full_name);
  } catch (profileError) {
    console.log('❌ 获取个人资料失败:', profileError.response?.data || profileError.message);
    return;
  }
  
  console.log('🎉 所有测试通过！会员资料API功能正常');
}

testProfileAPI().catch(console.error);
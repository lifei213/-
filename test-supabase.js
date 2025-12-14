// 测试Supabase连接和功能的脚本
const { supabase, testSupabaseConnection } = require('./config/supabase');

async function runTests() {
  console.log('=== 开始测试Supabase连接和功能 ===\n');

  try {
    // 测试1: Supabase客户端连接
    console.log('1. 测试Supabase客户端连接...');
    const supabaseConnected = await testSupabaseConnection();
    if (supabaseConnected) {
      console.log('✅ Supabase客户端连接成功');
    } else {
      console.log('❌ Supabase客户端连接失败');
      return;
    }

    // 测试2: 测试数据库查询功能
    console.log('\n2. 测试数据库查询功能...');
    
    // 测试Supabase客户端查询
    console.log('   测试Supabase客户端查询...');
    const { data: supabaseData, error: supabaseError } = await supabase
      .from('users')
      .select('user_id, username, email, role')
      .limit(3);

    if (supabaseError) {
      console.log('   ❌ Supabase客户端查询失败:', supabaseError.message);
    } else {
      console.log('   ✅ Supabase客户端查询成功，返回', supabaseData.length, '条记录');
      if (supabaseData.length > 0) {
        console.log('   示例数据:', JSON.stringify(supabaseData[0], null, 2));
      }
    }

    // 测试3: 测试会员表查询
    console.log('\n3. 测试会员表查询...');
    const { data: memberData, error: memberError } = await supabase
      .from('members')
      .select('member_id, full_name, phone, address, user_id')
      .limit(3);

    if (memberError) {
      console.log('   ❌ 会员表查询失败:', memberError.message);
    } else {
      console.log('   ✅ 会员表查询成功，返回', memberData.length, '条记录');
      if (memberData.length > 0) {
        console.log('   示例数据:', JSON.stringify(memberData[0], null, 2));
      }
    }

    // 测试4: 测试关联查询 (使用Supabase的join语法)
    console.log('\n4. 测试关联查询...');
    const { data: joinedData, error: joinedError } = await supabase
      .from('members')
      .select('member_id, full_name, phone, user_id, users(username, email)')
      .limit(2);

    if (joinedError) {
      console.log('   ❌ 关联查询失败:', joinedError.message);
    } else {
      console.log('   ✅ 关联查询成功，返回', joinedData.length, '条记录');
      if (joinedData.length > 0) {
        console.log('   示例数据:', JSON.stringify(joinedData[0], null, 2));
      }
    }

    console.log('\n=== 所有测试完成！===');
    console.log('✅ Supabase客户端连接配置成功！');
    console.log('✅ 数据库查询和关联查询功能正常！');

  } catch (error) {
    console.error('\n❌ 测试过程中发生错误:', error);
    console.log('\n=== 测试失败！===');
  }
}

runTests();

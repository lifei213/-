const { createClient } = require('@supabase/supabase-js');

// Supabase配置
const supabaseUrl = 'https://tdbbstlkwmautdwnrgcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYmJzdGxrd21hdXRkd25yZ2NiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTY1NDM2OCwiZXhwIjoyMDgxMjMwMzY4fQ.-8weJDkyy-pXU05yx6kR_Eu37ydC1DkF_KhHP9HW3d0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixMessagesSequence() {
  console.log('开始修复messages表序列问题...\n');

  try {
    // 1. 检查messages表的当前最大ID
    console.log('1. 检查messages表的当前最大ID...');
    const { data: maxIdData, error: maxIdError } = await supabase
      .from('messages')
      .select('message_id')
      .order('message_id', { ascending: false })
      .limit(1);

    if (maxIdError) {
      console.log('❌ 查询最大ID失败:', maxIdError);
      return;
    }

    const maxId = maxIdData && maxIdData.length > 0 ? maxIdData[0].message_id : 0;
    console.log('✅ messages表当前最大ID:', maxId);

    // 2. 重置序列
    console.log('\n2. 重置messages表序列...');
    
    // 需要手动在Supabase SQL编辑器中执行的SQL语句
    const resetSequenceSQL = `
      -- 重置messages表的序列
      SELECT setval('messages_message_id_seq', (SELECT COALESCE(MAX(message_id), 0) FROM messages) + 1);
    `;
    
    console.log('需要手动在Supabase SQL编辑器中执行以下SQL语句:');
    console.log(resetSequenceSQL);
    
    // 3. 检查序列当前值
    console.log('\n3. 检查序列当前值...');
    
    // 尝试插入一条测试消息来验证序列问题
    console.log('尝试插入测试消息...');
    const testMessage = {
      sender_id: 1,
      receiver_id: 2,
      subject: '测试消息',
      content: '这是一条测试消息',
      is_read: false
    };
    
    const { data: newMessage, error: insertError } = await supabase
      .from('messages')
      .insert(testMessage)
      .select()
      .single();

    if (insertError) {
      console.log('❌ 插入测试消息失败:', insertError);
      
      if (insertError.message.includes('duplicate key')) {
        console.log('⚠️  确认存在序列冲突问题，需要重置序列');
      }
    } else {
      console.log('✅ 测试消息插入成功，消息ID:', newMessage.message_id);
      
      // 删除测试消息
      const { error: deleteError } = await supabase
        .from('messages')
        .delete()
        .eq('message_id', newMessage.message_id);
      
      if (!deleteError) {
        console.log('✅ 测试消息已删除');
      }
    }

    console.log('\n✅ 序列修复建议完成');
    
  } catch (error) {
    console.error('修复过程中发生错误:', error);
  }
}

// 运行修复
fixMessagesSequence();
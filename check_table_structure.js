const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://tdbbstlkwmautdwnrgcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYmJzdGxrd21hdXRkd25yZ2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NTQzNjgsImV4cCI6MjA4MTIzMDM2OH0.DcOLXDcoS3l_SRjwacyeMh_SgVs6s1m9eXDcliAuUJU';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTableStructure() {
  console.log('检查messages表结构...');
  
  // 尝试插入一条测试数据来查看表结构
  const testData = {
    sender_id: 1,
    recipient_id: 2,
    subject: '测试消息',
    content: '这是一个测试消息',
    is_read: false,
    sent_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('messages')
    .insert(testData)
    .select();
    
  if (error) {
    console.error('插入测试数据失败，错误信息:', error);
    console.log('这表明messages表可能缺少某些字段');
    return;
  }
  
  if (data && data.length > 0) {
    console.log('messages表字段:', Object.keys(data[0]));
    
    // 删除测试数据
    await supabase
      .from('messages')
      .delete()
      .eq('message_id', data[0].message_id);
  }
}

checkTableStructure();
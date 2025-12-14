const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://tdbbstlkwmautdwnrgcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYmJzdGxrd21hdXRkd25yZ2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NTQzNjgsImV4cCI6MjA4MTIzMDM2OH0.DcOLXDcoS3l_SRjwacyeMh_SgVs6s1m9eXDcliAuUJU';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabaseTable() {
  console.log('检查Supabase messages表结构...');
  
  // 尝试查询表结构信息
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .limit(0);
    
  if (error) {
    console.error('查询表结构失败:', error);
    
    // 如果表不存在，尝试创建表
    console.log('尝试创建messages表...');
    
    // 在Supabase中，我们需要通过SQL来修改表结构
    // 这里我们只能检查错误信息来推断表结构
    
    if (error.message.includes('recipient_id')) {
      console.log('错误表明messages表缺少recipient_id字段');
      console.log('需要修改Supabase兼容控制器以使用正确的字段名');
    }
    return;
  }
  
  console.log('messages表结构正常，字段:', Object.keys(data));
}

checkSupabaseTable();